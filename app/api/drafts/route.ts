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
    const drafts = await JobDescription.find({ userId: currentUser.userId, isDraft: true })
      .sort({ createdAt: -1 });
    return NextResponse.json({ drafts });
  } catch (error: any) {
    console.error('Fetch drafts error:', error);
    
    if (error.message?.includes('ENOTFOUND') || error.message?.includes('querySrv')) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}