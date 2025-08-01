import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import JobDescription from '@/lib/models/JobDescription';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const {
      jobTitle,
      techStack,
      experienceLevel,
      workMode,
      aboutCompany,
      generatedContent,
    } = await request.json();

    // Validate required fields
    if (!jobTitle || !experienceLevel || !workMode || !generatedContent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new job description draft
    const jobDescription = await JobDescription.create({
      userId: currentUser.userId,
      jobTitle,
      techStack: techStack || [],
      experienceLevel,
      workMode,
      aboutCompany,
      generatedContent,
      isDraft: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Draft saved successfully',
      jobDescription: {
        id: jobDescription._id,
        jobTitle: jobDescription.jobTitle,
        createdAt: jobDescription.createdAt,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Save draft error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 