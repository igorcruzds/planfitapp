const { db } = require('../db');

function getProfile(req, res) {
  const { id } = req.params;

  let user = db.users.find(u => u.id === id);
  if (!user) {
    user = { id, streak: 0, level: 1, vip: false };
  }

  const userPosts = db.posts.filter(p => p.userId === id);

  res.json({
    success: true,
    user,
    streak: user.streak || 0,
    posts: userPosts,
    level: user.level || 1,
  });
}

module.exports = { getProfile };
