import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  // Clear the auth token cookie
  cookies().set({
    name: 'auth_token',
    value: '',
    expires: new Date(0), // Set expiration to epoch (effectively deleting)
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  
  return NextResponse.json({ success: true });
}

