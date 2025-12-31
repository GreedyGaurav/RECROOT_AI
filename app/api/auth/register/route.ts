import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: 'user',
      isActive: true,
    });

    await user.save();

    // Return success response without setting authentication cookie
    const response = NextResponse.json({
      message: 'Registration successful! Please login to continue.',
      success: true,
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Provide more specific error messages
    if (error.message?.includes('ENOTFOUND') || error.message?.includes('querySrv')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB connection string.' },
        { status: 503 }
      );
    }
    
    if (error.message?.includes('MongoServerError') || error.message?.includes('MongoNetworkError')) {
      return NextResponse.json(
        { error: 'Database connection error. Please try again later.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 