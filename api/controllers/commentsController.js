const { db } = require('../db');

function addComment(req, res) {
  const { postId, userId, nm, av, avatar_url, text } = req.body;
  if (!postId || !userId || !text) {
    return res.status(400).json({ success: false, error: 'postId, userId, and text required' });
  }

  const post = db.posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

  const comment = {
    id:           Date.now().toString(),
    postId,
    userId,
    nm:           nm  || userId,
    av:           av  || '🌸',
    avatar_url:   avatar_url || null,
    text,
    time:         'agora',
    replies:      [],
    showReplyInput: false,
    replyInput:   '',
    createdAt:    new Date(),
  };

  post.comments.push(comment);
  db.comments.push(comment);

  res.status(201).json({ success: true, comment });
}

module.exports = { addComment };
