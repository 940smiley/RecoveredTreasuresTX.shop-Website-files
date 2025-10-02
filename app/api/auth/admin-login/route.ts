import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { env } from '@/lib/config';
import { createRateLimiter } from '@/lib/rate-limit';

// Create a rate limiter: 5 attempts per minute
const rateLimiter = createRateLimiter({
  limit: 5,
  windowMs: 60000, // 1 minute
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimit = await rateLimiter(request);
    
    // If rate limit response is returned, the limit was exceeded
    if (rateLimit instanceof NextResponse) {
      return rateLimit;
    }
    
    const data = await request.json();
    const { password } = data;
    
    // Compare with the validated environment variable
    if (password !== env.ADMIN_PASSWORD) {
      // Return error but don't specify what was wrong for security
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { 
          status: 401,
          headers: rateLimit
        }
      );
    }
    
    // Create a JWT token with NO FALLBACK secret
    const token = sign(
      { 
        role: 'admin',
        // Add no personal or sensitive information here
      },
      env.JWT_SECRET,
      { expiresIn: '4h' } // Token expires in 4 hours
    );
    
    const response = NextResponse.json(
      { success: true },
      { headers: rateLimit }
    );

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 4, // 4 hours in seconds
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
}
