# API Documentation

Base URL: `http://localhost:4000/api/v1`

Interactive Swagger UI: `http://localhost:4000/docs`

## Authentication

All endpoints (except `/auth/login`) require a Bearer JWT token:
```
Authorization: Bearer <access_token>
```

---

## Auth Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/auth/login` | Login with email/password |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Invalidate tokens |
| GET  | `/auth/me` | Get current user |

---

## User Endpoints

| Method | Path | Description |
|---|---|---|
| GET    | `/users` | List all users (paginated) |
| GET    | `/users/:id` | Get user by ID |
| POST   | `/users` | Create user |
| PATCH  | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

---

## Experiment Endpoints

| Method | Path | Description |
|---|---|---|
| GET    | `/experiments` | List experiments |
| GET    | `/experiments/:id` | Get experiment details |
| POST   | `/experiments` | Create experiment |
| PATCH  | `/experiments/:id` | Update experiment |
| DELETE | `/experiments/:id` | Delete experiment |

---

## Session Endpoints

| Method | Path | Description |
|---|---|---|
| GET    | `/sessions` | List sessions |
| GET    | `/sessions/:id` | Get session details |
| POST   | `/sessions` | Schedule session |
| POST   | `/sessions/:id/start` | Start session |
| POST   | `/sessions/:id/end` | End session |

---

## Submission Endpoints

| Method | Path | Description |
|---|---|---|
| POST   | `/submissions` | Submit code |
| GET    | `/submissions/me` | My submissions |
| GET    | `/submissions/:id` | Get submission |
| PATCH  | `/submissions/:id/grade` | Grade submission |

---

## AI Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/ai/hint` | Get progressive hint |
| POST | `/ai/explain-error` | Explain code error |
| POST | `/ai/viva/generate` | Generate viva questions |

---

## WebSocket Events

**Namespace: `/session`**

| Event (Client→Server) | Payload | Description |
|---|---|---|
| `join-session` | `{ sessionId }` | Join a session room |
| `code-update` | `{ sessionId, studentId, code }` | Broadcast code change |

| Event (Server→Client) | Payload | Description |
|---|---|---|
| `student-joined` | `{ clientId }` | New student connected |
| `student-code-update` | `{ studentId, code }` | Code update from student |

**Namespace: `/notifications`**

| Event | Payload | Description |
|---|---|---|
| `subscribe` | `{ userId }` | Subscribe to user notifications |
| `notification` | `{ title, body }` | Receive notification |
