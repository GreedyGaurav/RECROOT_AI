import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import JobDescription from '@/lib/models/JobDescription';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const competitors = await JobDescription.find({ 
      userId: currentUser.userId, 
      isCompetitorJD: true 
    }).sort({ createdAt: -1 });

    return NextResponse.json({ competitors });
  } catch (error) {
    console.error('Fetch competitors error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 