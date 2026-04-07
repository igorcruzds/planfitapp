const { db } = require('../db');

function activateVip(req, res) {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ success: false, error: 'userId required' });

  let user = db.users.find(u => u.id === userId);
  if (!user) {
    user = { id: userId, streak: 0, level: 1, vip: false };
    db.users.push(user);
  }

  user.vip = true;

  res.json({ success: true, vip: true, userId });
}

module.exports = { activateVip };
