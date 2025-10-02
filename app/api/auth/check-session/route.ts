import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { env } from '@/lib/config';
import { createRateLimiter } from '@/lib/rate-limit';

// Create a rate limiter: 20 attempts per minute
const rateLimiter = createRateLimiter({
  limit: 20,
  windowMs: 60000, // 1 minute
});

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimit = await rateLimiter(request);
    
    // If rate limit response is returned, the limit was exceeded
    if (rateLimit instanceof NextResponse) {
      return rateLimit;
    }
    
    // Get the token from cookies
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { 
          status: 401,
          headers: rateLimit
        }
      );
    }
    
    // Verify the token with NO FALLBACK secret
    try {
      const decoded = verify(token, env.JWT_SECRET);
      
      // Check if role is admin
      if (decoded && typeof decoded === 'object' && decoded.role === 'admin') {
        return NextResponse.json(
          { success: true, role: 'admin' },
          { headers: rateLimit }
        );
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid session' },
          { 
            status: 403,
            headers: rateLimit
          }
        );
      }
    } catch (err) {
      // Token verification failed
      return NextResponse.json(
        { success: false, message: 'Session expired' },
        { 
          status: 401,
          headers: rateLimit
        }
      );
    }
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred checking authentication' },
      { status: 500 }
    );
  }
}
