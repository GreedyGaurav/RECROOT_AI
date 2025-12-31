import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

if (!GEMINI_API_KEY) {
  throw new Error('Please define the GEMINI_API_KEY environment variable inside .env.local');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface JobDescriptionInput {
  jobTitle: string;
  techStack: string[];
  experienceLevel: string;
  workMode: string;
  aboutCompany?: string;
}

export interface GeneratedJobDescription {
  aboutUs: string;
  responsibilities: string[];
  requiredSkills: string[];
  benefits: string[];
}

export async function generateJobDescription(input: JobDescriptionInput): Promise<GeneratedJobDescription> {
  try {
    // Try the latest model first, fallback to older versions if needed
    let model;
    try {
      model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    } catch (modelError) {
      // Fallback to alternative model names
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      } catch {
        model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      }
    }

    const prompt = `
You are an expert HR professional and job description writer. Create a compelling job description for the following role:

Job Title: ${input.jobTitle}
Experience Level: ${input.experienceLevel}
Work Mode: ${input.workMode}
Tech Stack: ${input.techStack.join(', ')}
${input.aboutCompany ? `About Company: ${input.aboutCompany}` : ''}

Please generate a professional job description with the following structure:

1. About Us section (2-3 sentences about the company culture and mission)
2. Responsibilities (5-7 bullet points)
3. Required Skills (include the tech stack + soft skills, 6-8 total)
4. Benefits (5-6 attractive benefits)

Make it engaging, professional, and tailored to the tech industry. Focus on attracting top talent.

Return the response in this exact JSON format:
{
  "aboutUs": "About us text here",
  "responsibilities": ["Responsibility 1", "Responsibility 2", ...],
  "requiredSkills": ["Skill 1", "Skill 2", ...],
  "benefits": ["Benefit 1", "Benefit 2", ...]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Failed to extract JSON from response:', text);
      throw new Error('Failed to parse AI response');
    }
    
    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Extracted text:', jsonMatch[0]);
      throw new Error('Failed to parse AI response as JSON');
    }
    
    // Validate required fields
    if (!parsed.aboutUs || !parsed.responsibilities || !parsed.requiredSkills || !parsed.benefits) {
      throw new Error('AI response missing required fields');
    }
    
    return {
      aboutUs: parsed.aboutUs,
      responsibilities: Array.isArray(parsed.responsibilities) ? parsed.responsibilities : [],
      requiredSkills: Array.isArray(parsed.requiredSkills) ? parsed.requiredSkills : [],
      benefits: Array.isArray(parsed.benefits) ? parsed.benefits : [],
    };
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    if (error.message?.includes('API_KEY')) {
      throw new Error('GEMINI_API_KEY is invalid or not set');
    }
    
    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      throw new Error('Gemini API quota exceeded. Please try again later.');
    }
    
    throw new Error(error.message || 'Failed to generate job description');
  }
} 