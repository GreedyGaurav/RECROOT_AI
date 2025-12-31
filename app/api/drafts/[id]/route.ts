import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import JobDescription from '@/lib/models/JobDescription';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await Promise.resolve(params);
    await dbConnect();
    const draft = await JobDescription.findOne({
      _id: resolvedParams.id,
      userId: currentUser.userId,
    });

    if (!draft) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }

    return NextResponse.json({ draft });
  } catch (error: any) {
    console.error('Fetch draft error:', error);
    
    if (error.message?.includes('ENOTFOUND') || error.message?.includes('querySrv')) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await Promise.resolve(params);
    await dbConnect();
    const draft = await JobDescription.findOneAndDelete({
      _id: resolvedParams.id,
      userId: currentUser.userId,
    });

    if (!draft) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Draft deleted successfully' });
  } catch (error: any) {
    console.error('Delete draft error:', error);
    
    if (error.message?.includes('ENOTFOUND') || error.message?.includes('querySrv')) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 