import express from 'express';
import config from '../config.js';
import { hashPassword, verifyPassword, randomToken } from '../lib/password.js';
import {
  createSession,
  createUser,
  deleteSession,
  deleteUser,
  deleteUserSessions,
  getUserByEmail,
  getUserById,
  listUsers,
  logEvent,
  updateUser,
} from '../db/index.js';
import {
  clearSessionCookie,
  isSubscriptionActive,
  readSessionToken,
  requireAdmin,
  resolveUser,
  setSessionCookie,
} from '../middleware/auth.js';

const router = express.Router();
const ALLOWED_ROLES = new Set(['admin', 'subscriber']);
const ALLOWED_STATUS = new Set(['active', 'inactive']);

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    expires_at: user.expires_at || null,
    notes: user.notes || '',
    created_at: user.created_at,
    updated_at: user.updated_at,
    last_login_at: user.last_login_at || null,
    subscription_active: user.role === 'admin' ? true : isSubscriptionActive(user),
  };
}

function sessionExpiresAt() {
  return new Date(Date.now() + config.auth.sessionDays * 24 * 3600 * 1000).toISOString();
}

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Informe e-mail e senha' });
    }

    const user = await getUserByEmail(email);
    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ ok: false, error: 'E-mail ou senha invalidos' });
    }
    if (user.status !== 'active') {
      return res.status(403).json({ ok: false, error: 'Conta inativa. Fale com o administrador.' });
    }
    if (user.role !== 'admin' && !isSubscriptionActive(user)) {
      return res.status(403).json({ ok: false, error: 'Assinatura expirada. Renove para continuar.' });
    }

    const token = randomToken();
    await createSession(user.id, token, sessionExpiresAt());
    setSessionCookie(res, token);
    await logEvent('auth', 'info', `Login: ${user.email}`);
    res.json({ ok: true, data: { user: publicUser(user), token } });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const token = readSessionToken(req);
    await deleteSession(token);
    clearSessionCookie(res);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await resolveUser(req);
    if (!user) return res.status(401).json({ ok: false, error: 'Nao autenticado' });
    if (user.role !== 'admin' && !isSubscriptionActive(user)) {
      return res.status(403).json({ ok: false, error: 'Assinatura inativa ou expirada' });
    }
    res.json({ ok: true, data: { user: publicUser(user) } });
  } catch (error) {
    next(error);
  }
});

router.get('/users', requireAdmin, async (req, res, next) => {
  try {
    const users = await listUsers({
      role: req.query.role,
      status: req.query.status,
      search: req.query.search,
      limit: req.query.limit,
      offset: req.query.offset,
    });
    res.json({ ok: true, data: users.map(publicUser) });
  } catch (error) {
    next(error);
  }
});

router.post('/users', requireAdmin, async (req, res, next) => {
  try {
    const body = req.body || {};
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const role = body.role || 'subscriber';
    const status = body.status || 'active';

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, error: 'Nome, e-mail e senha sao obrigatorios' });
    }
    if (password.length < 6) {
      return res.status(400).json({ ok: false, error: 'Senha deve ter pelo menos 6 caracteres' });
    }
    if (!ALLOWED_ROLES.has(role) || !ALLOWED_STATUS.has(status)) {
      return res.status(400).json({ ok: false, error: 'Papel ou status invalido' });
    }
    if (await getUserByEmail(email)) {
      return res.status(409).json({ ok: false, error: 'Ja existe um usuario com este e-mail' });
    }

    const user = await createUser({
      name,
      email,
      password_hash: hashPassword(password),
      role,
      status,
      expires_at: body.expires_at || null,
      notes: body.notes || '',
    });
    await logEvent('admin', 'info', `Assinante criado: ${email}`);
    res.status(201).json({ ok: true, data: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.patch('/users/:id', requireAdmin, async (req, res, next) => {
  try {
    const current = await getUserById(req.params.id);
    if (!current) return res.status(404).json({ ok: false, error: 'Usuario nao encontrado' });

    const body = req.body || {};
    const patch = {};
    if (body.name !== undefined) patch.name = String(body.name).trim();
    if (body.email !== undefined) patch.email = String(body.email).trim().toLowerCase();
    if (body.role !== undefined) {
      if (!ALLOWED_ROLES.has(body.role)) {
        return res.status(400).json({ ok: false, error: 'Papel invalido' });
      }
      patch.role = body.role;
    }
    if (body.status !== undefined) {
      if (!ALLOWED_STATUS.has(body.status)) {
        return res.status(400).json({ ok: false, error: 'Status invalido' });
      }
      patch.status = body.status;
    }
    if (body.expires_at !== undefined) patch.expires_at = body.expires_at || null;
    if (body.notes !== undefined) patch.notes = body.notes;
    if (body.password) {
      if (String(body.password).length < 6) {
        return res.status(400).json({ ok: false, error: 'Senha deve ter pelo menos 6 caracteres' });
      }
      patch.password_hash = hashPassword(body.password);
    }
    if (patch.email && patch.email !== current.email && await getUserByEmail(patch.email)) {
      return res.status(409).json({ ok: false, error: 'Ja existe um usuario com este e-mail' });
    }

    const updated = await updateUser(current.id, patch);
    if (patch.status === 'inactive' || patch.password_hash) {
      await deleteUserSessions(current.id);
    }
    await logEvent('admin', 'info', `Usuario atualizado: ${updated.email}`);
    res.json({ ok: true, data: publicUser(updated) });
  } catch (error) {
    next(error);
  }
});

router.delete('/users/:id', requireAdmin, async (req, res, next) => {
  try {
    if (req.user?.id === req.params.id) {
      return res.status(400).json({ ok: false, error: 'Voce nao pode excluir a propria conta' });
    }
    const current = await getUserById(req.params.id);
    if (!current) return res.status(404).json({ ok: false, error: 'Usuario nao encontrado' });
    await deleteUser(current.id);
    await logEvent('admin', 'info', `Usuario excluido: ${current.email}`);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export { publicUser, requireAdmin };
export default router;
