import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE_NAME = 'portfolio_admin_session';
const ADMIN_SESSION_VALUE = 'kunal-admin';

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'portfolio-local-admin-secret';
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'kunal',
    password: process.env.ADMIN_PASSWORD || '123',
  };
}

export function createAdminSessionToken() {
  const signature = createHmac('sha256', getSecret()).update(ADMIN_SESSION_VALUE).digest('hex');
  return `${ADMIN_SESSION_VALUE}.${signature}`;
}

export function isValidAdminToken(token) {
  if (!token || !token.includes('.')) return false;

  const [value, signature] = token.split('.');
  if (value !== ADMIN_SESSION_VALUE || !signature) return false;

  const expected = createAdminSessionToken().split('.')[1];
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export function isAdminRequest(request) {
  return isValidAdminToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}
