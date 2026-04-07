# Planfit40

A fitness tracking progressive web app for women, focused on consistency-based level progression.

## Architecture

- **Frontend**: `index.html` — React 18 (via CDN) + Babel standalone, all CSS and JS inline
- **Static server**: `server.py` — Python's built-in `http.server` serving the frontend on port 5000
- **API backend**: `server.js` — Express.js REST API on port 3000 (in-memory data, ready for MongoDB)
- **Storage**: `localStorage` (client-side) + in-memory API data (`api/db.js`)

## Backend Structure

```
server.js              # Express entry point (port 3000)
api/
  db.js                # In-memory mock database (users, posts, comments, ranking)
  routes/
    workoutRoutes.js   # POST /api/register-workout, POST /api/swap-workout
    postsRoutes.js     # GET /api/posts, POST /api/posts
    commentsRoutes.js  # POST /api/comments
    likesRoutes.js     # POST /api/like
    rankingRoutes.js   # GET /api/ranking
    profileRoutes.js   # GET /api/profile/:id
    vipRoutes.js       # POST /api/vip
  controllers/
    workoutController.js
    postsController.js
    commentsController.js
    likesController.js
    rankingController.js
    profileController.js
    vipController.js
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/register-workout | Log workout, update streak & ranking |
| POST | /api/swap-workout | Swap today's workout |
| GET | /api/posts | Get all community posts |
| POST | /api/posts | Create a new post |
| POST | /api/comments | Add comment to a post |
| POST | /api/like | Like a post |
| GET | /api/ranking | Get leaderboard |
| GET | /api/profile/:id | Get user profile, streak, posts |
| POST | /api/vip | Activate VIP for a user |
| GET | /health | Health check |

## Features

- Login with name, email, and fitness level selection
- Daily workout check-in tracking
- Progress bar and level system (6 levels: Beginner → Advanced III)
- 40-day cycle per level, with early unlock at 36 days (90%)
- Visual 30-day calendar of past check-ins
- Community feed with auto-translation (MyMemory API)
- Multilingual: Portuguese, Spanish, English
- Animated modals for check-in and level-up events
- Bottom navigation: Dashboard, Feed, Community, Guide, Profile
- VIP subscription section

## Levels

1. Iniciante / Beginner — 🌱
2. Intermediário I / Intermediate I — ⚡
3. Intermediário II / Intermediate II — 🔥
4. Avançado I / Advanced I — 🏆
5. Avançado II / Advanced II — 💎
6. Avançado III / Advanced III — 👑

## Running

- **Frontend**: "Start application" workflow → `python server.py` (port 5000)
- **API**: "Start API" workflow → `node server.js` (port 3000)
