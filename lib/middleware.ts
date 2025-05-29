import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { env } from './config';

/**
 * Checks if a user is authenticated via JWT token
 */
export async function isAuthenticated(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = cookies().get('auth_token')?.value;
    
    if (!token) {
      return false;
    }
    
    // Verify the token with no fallback secret - we require it to be set
    const decoded = verify(token, env.JWT_SECRET);
    
    // Check if role is admin
    return decoded && typeof decoded === 'object' && decoded.role === 'admin';
  } catch (err) {
    return false;
  }
}

/**
 * Middleware to protect API routes
 */
export async function authMiddleware(request: NextRequest) {
  const isAuthed = await isAuthenticated(request);
  
  if (!isAuthed) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return null; // Continue to route handler if authenticated
}

