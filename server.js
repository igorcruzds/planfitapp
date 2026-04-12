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

// Mantem compatibilidade com seu código atual
global.posts = global.posts || [];
global.ranking = global.ranking || [];
global.comments = global.comments || [];
global.rankingWeekly = global.rankingWeekly || [];
global.rankingMonthly = global.rankingMonthly || [];

// Admin fixo
const ADMIN_USER = {
  id: 'admin-1',
  email: process.env.ADMIN_EMAIL || 'admin@planfit.com',
  password: process.env.ADMIN_PASSWORD || '123456',
  name: 'Administrador',
  role: 'admin',
};

// Sessões em memória
const sessions = new Map();

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

// Auth opcional: não quebra rotas antigas
function optionalAuth(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    req.user = null;
    return next();
  }

  const session = sessions.get(token);
  req.user = session ? session.user : null;
  next();
}

function requireAuth(req, res, next) {
  optionalAuth(req, res, () => {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        message: 'Não autenticado',
      });
    }
    next();
  });
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

// Login admin
app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};

  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
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

app.post('/api/logout', requireAuth, (req, res) => {
  const token = getTokenFromRequest(req);
  if (token) sessions.delete(token);

  return res.json({
    ok: true,
    message: 'Logout realizado com sucesso',
  });
});

app.get('/api/me', requireAuth, (req, res) => {
  return res.json({
    ok: true,
    user: req.user,
    role: req.user.role,
  });
});

// API routes antigas intactas
app.use('/api', workoutRoutes);
app.use('/api', postsRoutes);
app.use('/api', commentsRoutes);
app.use('/api', likesRoutes);
app.use('/api', rankingRoutes);
app.use('/api', profileRoutes);
app.use('/api', vipRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Link secreto antigo mantido
app.get('/admin-reset-123', (req, res) => {
  global.posts = [];
  global.ranking = [];
  global.comments = [];
  global.rankingWeekly = [];
  global.rankingMonthly = [];

  res.send('App resetado com sucesso');
});

// Rota admin protegida
app.get('/admin', requireAuth, isAdmin, (req, res) => {
  res.json({
    ok: true,
    message: 'Área administrativa liberada',
    user: req.user,
  });
});

// Reset ranking semanal
app.post('/api/admin/reset-ranking-weekly', requireAuth, isAdmin, (req, res) => {
  global.rankingWeekly = [];

  return res.json({
    ok: true,
    message: 'Ranking semanal resetado com sucesso',
  });
});

// Reset ranking mensal
app.post('/api/admin/reset-ranking-monthly', requireAuth, isAdmin, (req, res) => {
  global.rankingMonthly = [];
  global.ranking = [];

  return res.json({
    ok: true,
    message: 'Ranking mensal resetado com sucesso',
  });
});

// Reset geral
app.post('/api/admin/reset-all', requireAuth, isAdmin, (req, res) => {
  global.posts = [];
  global.ranking = [];
  global.comments = [];
  global.rankingWeekly = [];
  global.rankingMonthly = [];

  return res.json({
    ok: true,
    message: 'App resetado com sucesso',
  });
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Fallback
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`PlanFit API + Frontend rodando na porta ${PORT}`);
});
