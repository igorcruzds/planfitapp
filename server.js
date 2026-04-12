const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');

const workoutRoutes  = require('./api/routes/workoutRoutes');
const postsRoutes    = require('./api/routes/postsRoutes');
const commentsRoutes = require('./api/routes/commentsRoutes');
const likesRoutes    = require('./api/routes/likesRoutes');
const rankingRoutes  = require('./api/routes/rankingRoutes');
const profileRoutes  = require('./api/routes/profileRoutes');
const vipRoutes      = require('./api/routes/vipRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Estado global existente
global.posts = global.posts || [];
global.ranking = global.ranking || [];
global.comments = global.comments || [];

// Admin fixo
const ADMIN_USER = {
  id: 'admin-1',
  email: process.env.ADMIN_EMAIL || 'admin@planfit.com',
  password: process.env.ADMIN_PASSWORD || '123456',
  name: 'Administrador',
  role: 'admin',
};

// Sessões simples em memória
const sessions = new Map();

// Helpers
function createToken() {
  return crypto.randomBytes(24).toString('hex');
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return req.headers['x-auth-token'] || null;
}

function auth(req, res, next) {
  const token = getTokenFromRequest(req);

  if (!token) {
    req.user = null;
    return next();
  }

  const session = sessions.get(token);
  if (!session) {
    req.user = null;
    return next();
  }

  req.user = session.user;
  req.token = token;
  next();
}

function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      ok: false,
      message: 'Acesso negado. Requer role admin.',
    });
  }
  next();
}

app.use(auth);

// Login com retorno de role
app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};

  if (
    email === ADMIN_USER.email &&
    password === ADMIN_USER.password
  ) {
    const token = createToken();

    const user = {
      id: ADMIN_USER.id,
      email: ADMIN_USER.email,
      name: ADMIN_USER.name,
      role: ADMIN_USER.role,
    };

    sessions.set(token, { user, createdAt: Date.now() });

    return res.json({
      ok: true,
      token,
      user,
      role: user.role,
    });
  }

  return res.status(401).json({
    ok: false,
    message: 'Credenciais inválidas',
  });
});

app.post('/api/logout', (req, res) => {
  const token = getTokenFromRequest(req);
  if (token) sessions.delete(token);

  return res.json({
    ok: true,
    message: 'Logout realizado com sucesso',
  });
});

app.get('/api/me', (req, res) => {
  return res.json({
    ok: true,
    user: req.user || null,
    role: req.user?.role || null,
  });
});

// API routes existentes
app.use('/api', workoutRoutes);
app.use('/api', postsRoutes);
app.use('/api', commentsRoutes);
app.use('/api', likesRoutes);
app.use('/api', rankingRoutes);
app.use('/api', profileRoutes);
app.use('/api', vipRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// LINK SECRETO RESET - mantido por compatibilidade
app.get('/admin-reset-123', (req, res) => {
  global.posts = [];
  global.ranking = [];
  global.comments = [];

  res.send('App resetado com sucesso');
});

// Rota admin protegida
app.get('/admin', isAdmin, (req, res) => {
  res.json({
    ok: true,
    message: 'Área administrativa liberada',
    user: req.user,
  });
});

// Exemplo de reset protegido
app.post('/api/admin/reset-all', isAdmin, (req, res) => {
  global.posts = [];
  global.ranking = [];
  global.comments = [];

  return res.json({
    ok: true,
    message: 'App resetado com sucesso',
  });
});

// Serve static files (index.html + assets) from project root
app.use(express.static(path.join(__dirname)));

// Fallback: serve index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`PlanFit API + Frontend rodando na porta ${PORT}`);
});
