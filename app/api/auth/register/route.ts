import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('Registration attempt started');
    
    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

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

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    console.log('JWT token generated for new user');

    // Create response
    const response = NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });

    // Set HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
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