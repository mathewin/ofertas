import config from '../config.js';
import { getSessionUser } from '../db/index.js';

const COOKIE_NAME = 'ofertas_session';

export function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = decodeURIComponent(part.slice(eq + 1).trim());
    if (key) out[key] = value;
  }
  return out;
}

export function readSessionToken(req) {
  const cookies = parseCookies(req);
  const header = req.get('authorization') || '';
  const bearer = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
  return (
    cookies[COOKIE_NAME] ||
    req.get('x-session-token') ||
    bearer ||
    ''
  );
}

export function setSessionCookie(res, token, maxAgeSeconds = config.auth.sessionDays * 24 * 3600) {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
  ];
  if (config.env === 'production') parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function clearSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
}

export function isSubscriptionActive(user) {
  if (!user) return false;
  if (user.status !== 'active') return false;
  if (user.expires_at && new Date(user.expires_at).getTime() < Date.now()) return false;
  return true;
}

export async function resolveUser(req) {
  const token = readSessionToken(req);
  if (!token) return null;
  return getSessionUser(token);
}

export async function requireAuth(req, res, next) {
  try {
    const user = await resolveUser(req);
    if (!user) {
      return res.status(401).json({ ok: false, error: 'Nao autenticado' });
    }
    if (!isSubscriptionActive(user) && user.role !== 'admin') {
      return res.status(403).json({ ok: false, error: 'Assinatura inativa ou expirada' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

export async function requireAdmin(req, res, next) {
  try {
    const token = req.get('x-admin-token') || req.query.token;
    if (token && token === config.adminToken) {
      req.user = {
        id: 'token-admin',
        name: 'Administrador',
        email: 'admin',
        role: 'admin',
        status: 'active',
      };
      return next();
    }

    const user = await resolveUser(req);
    if (!user) {
      return res.status(401).json({ ok: false, error: 'Nao autenticado' });
    }
    if (user.role !== 'admin' || user.status !== 'active') {
      return res.status(403).json({ ok: false, error: 'Acesso restrito ao administrador' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}
