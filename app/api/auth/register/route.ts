import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    console.log('Registration attempt started');
    
    await dbConnect();
    console.log('Database connected successfully');

    const { name, email, password } = await request.json();
    console.log('Registration attempt for email:', email);

    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
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
    console.log('User created successfully:', email);

    // Return success response without setting authentication cookie
    const response = NextResponse.json({
      message: 'Registration successful! Please login to continue.',
      success: true,
    });

    console.log('Registration successful for user:', email);
    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 