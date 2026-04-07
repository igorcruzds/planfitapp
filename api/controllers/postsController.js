const { db } = require('../db');

function getPosts(req, res) {
  const sorted = [...db.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, posts: sorted });
}

function createPost(req, res) {
  const { userId, nm, av, avatar_url, vip, workout, caption, text, image, lang, time } = req.body;
  if (!userId) return res.status(400).json({ success: false, error: 'userId required' });

  const post = {
    id:           Date.now().toString(),
    userId,
    nm:           nm     || userId,
    av:           av     || '🌸',
    avatar_url:   avatar_url || null,
    vip:          vip    || false,
    time:         time   || 'agora',
    workout:      workout || '',
    caption:      caption || text || '',
    photo:        image  || null,
    likes:        0,
    liked:        false,
    comments:     [],
    showComments: false,
    commentInput: '',
    lang:         lang   || 'pt',
    createdAt:    new Date(),
  };

  db.posts.unshift(post);
  res.status(201).json({ success: true, post });
}

module.exports = { getPosts, createPost };
