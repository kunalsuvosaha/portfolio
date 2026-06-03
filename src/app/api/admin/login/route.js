import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, createAdminSessionToken, getAdminCredentials } from '@/lib/admin-auth';

export async function POST(request) {
  const { username, password } = await request.json();
  const credentials = getAdminCredentials();

  if (username !== credentials.username || password !== credentials.password) {
    return NextResponse.json({ error: 'Invalid admin credentials.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: createAdminSessionToken(),
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 4,
  });

  return response;
}
