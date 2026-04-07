const { db } = require('../db');

function likePost(req, res) {
  const { postId } = req.body;
  if (!postId) return res.status(400).json({ success: false, error: 'postId required' });

  const post = db.posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

  post.likes = (post.likes || 0) + 1;

  res.json({ success: true, postId, likes: post.likes });
}

module.exports = { likePost };
