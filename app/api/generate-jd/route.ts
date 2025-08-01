import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { generateJobDescription, JobDescriptionInput } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const input: JobDescriptionInput = await request.json();

    // Validate required fields
    if (!input.jobTitle || !input.experienceLevel || !input.workMode) {
      return NextResponse.json(
        { error: 'Job title, experience level, and work mode are required' },
        { status: 400 }
      );
    }

    // Generate job description using Gemini
    const generatedJD = await generateJobDescription(input);

    return NextResponse.json({
      success: true,
      jobDescription: generatedJD,
    });

  } catch (error: any) {
    console.error('Generate JD error:', error);
    
    if (error.message.includes('GEMINI_API_KEY')) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }
    
    if (error.message.includes('Failed to generate')) {
      return NextResponse.json(
        { error: 'Failed to generate job description. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 