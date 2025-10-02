import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: 'auth_token',
    value: '',
    expires: new Date(0), // Set expiration to epoch (effectively deleting)
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  
  return response;
}
