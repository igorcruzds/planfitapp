const express = require('express');
const cors = require('cors');
const path = require('path');

const workoutRoutes  = require('./api/routes/workoutRoutes');
const postsRoutes    = require('./api/routes/postsRoutes');
const commentsRoutes = require('./api/routes/commentsRoutes');
const likesRoutes    = require('./api/routes/likesRoutes');
const rankingRoutes  = require('./api/routes/rankingRoutes');
const profileRoutes  = require('./api/routes/profileRoutes');
const vipRoutes      = require('./api/routes/vipRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', workoutRoutes);
app.use('/api', postsRoutes);
app.use('/api', commentsRoutes);
app.use('/api', likesRoutes);
app.use('/api', rankingRoutes);
app.use('/api', profileRoutes);
app.use('/api', vipRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Serve static files (index.html + assets) from project root
app.use(express.static(path.join(__dirname)));

// Fallback: serve index.html for any non-API route
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`PlanFit API + Frontend rodando na porta ${PORT}`);
});
