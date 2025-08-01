import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import JobDescription from '@/lib/models/JobDescription';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { jobTitle, companyName, jobDescription, experienceLevel, workMode, techStack } = body;

    // Validation
    if (!jobTitle || !companyName || !jobDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    // Create a new job description entry for competitor analysis
    const competitorJD = new JobDescription({
      userId: currentUser.userId,
      jobTitle,
      aboutCompany: companyName,
      experienceLevel: experienceLevel || 'Not specified',
      workMode: workMode || 'Not specified',
      techStack: techStack || [],
      generatedContent: {
        aboutUs: jobDescription,
        responsibilities: [],
        requiredSkills: [],
        benefits: []
      },
      isDraft: false, // Mark as competitor JD, not a draft
      isCompetitorJD: true // New field to identify competitor JDs
    });

    await competitorJD.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Competitor JD uploaded successfully',
      id: competitorJD._id 
    });
  } catch (error) {
    console.error('Upload competitor JD error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 