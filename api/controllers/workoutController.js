const { db } = require('../db');

function registerWorkout(req, res) {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ success: false, error: 'userId required' });

  let user = db.users.find(u => u.id === userId);
  if (!user) {
    user = { id: userId, streak: 0, level: 1, vip: false, createdAt: new Date() };
    db.users.push(user);
  }

  user.streak = (user.streak || 0) + 1;

  const rankEntry = db.ranking.find(r => r.userId === userId);
  if (rankEntry) {
    rankEntry.streak = user.streak;
    rankEntry.updatedAt = new Date();
  } else {
    db.ranking.push({ userId, streak: user.streak, level: user.level, updatedAt: new Date() });
  }

  db.ranking.sort((a, b) => b.streak - a.streak);

  res.json({ success: true, streak: user.streak, ranking: db.ranking });
}

function swapWorkout(req, res) {
  const { userId, newWorkout } = req.body;
  if (!userId || !newWorkout) return res.status(400).json({ success: false, error: 'userId and newWorkout required' });

  res.json({ success: true, userId, newWorkout });
}

module.exports = { registerWorkout, swapWorkout };
