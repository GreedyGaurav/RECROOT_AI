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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      throw new Error('Failed to parse AI response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      aboutUs: parsed.aboutUs,
      responsibilities: parsed.responsibilities,
      requiredSkills: parsed.requiredSkills,
      benefits: parsed.benefits,
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate job description');
  }
} 