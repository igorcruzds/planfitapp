const { db } = require('../db');

function getRanking(req, res) {
  const sorted = [...db.ranking].sort((a, b) => b.streak - a.streak);
  const enriched = sorted.map(r => {
    const user = db.users.find(u => u.id === r.userId);
    return {
      userId:     r.userId,
      nm:         user?.name     || r.userId,
      av:         user?.av       || '🌸',
      avatar_url: user?.avatar_url || null,
      lv:         user?.levelName || `Level ${r.level}`,
      score:      r.streak,
      vip:        user?.vip      || false,
      plan:       user?.plan     || 'planfit',
      highlight:  user?.highlight || false,
      updatedAt:  r.updatedAt,
    };
  });
  res.json({ success: true, ranking: enriched });
}

module.exports = { getRanking };
