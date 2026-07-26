# Architecture

## Overview

AI Virtual Lab is a multi-tier, microservices-based platform designed to deliver intelligent, real-time virtual lab experiences for educational institutions.

```
┌──────────────┐     HTTP/WS      ┌──────────────────┐
│   Frontend   │ ◄─────────────► │  Nginx Reverse   │
│ Next.js 15   │                  │  Proxy (:80)     │
└──────────────┘                  └────────┬─────────┘
                                           │
              ┌────────────────────────────┤
              │                            │
              ▼                            ▼
   ┌──────────────────┐        ┌──────────────────────┐
   │   Backend API    │        │   Backend WS Gateway │
   │   NestJS (:4000) │        │   Socket.IO          │
   └────────┬─────────┘        └──────────────────────┘
            │
    ┌───────┼──────────────┐
    │       │              │
    ▼       ▼              ▼
┌───────┐ ┌────────┐ ┌──────────────┐
│Prisma │ │RabbitMQ│ │  AI Services │
│  ORM  │ │ Queue  │ │  FastAPI     │
└───┬───┘ └────────┘ └──────────────┘
    │
    ▼
┌──────────┐
│PostgreSQL│
│  (:5432) │
└──────────┘
```

## Components

### Frontend (Next.js 15 + React 19)
- **App Router** with role-based layouts (Admin, Instructor, Student)
- **Zustand** for global state management
- **TanStack Query** for server state and caching
- **Socket.IO Client** for real-time features
- **Monaco Editor** for the in-browser code editor

### Backend (NestJS)
- **REST API** with Swagger documentation at `/docs`
- **Socket.IO Gateways** for live session and notifications
- **Prisma ORM** with PostgreSQL
- **JWT Authentication** with refresh token rotation
- **RabbitMQ** for async job processing (grading, certificates)

### AI Microservices (FastAPI + Python)

| Service | Port | Description |
|---|---|---|
| hint-service | 8001 | Progressive AI hints using Groq LLM |
| error-explanation-service | 8002 | Plain-language error explanations |
| viva-service | 8003 | AI viva question generation & evaluation |
| recommendation-service | 8004 | Content & experiment recommendations |
| knowledge-tracing-service | 8005 | BKT & DKVMN knowledge tracing |
| analytics-service | 8006 | Performance analytics aggregation |
| prediction-service | 8007 | At-risk student prediction |

### Code Execution (Judge0)
- Self-hosted Judge0 instance on port `2358`
- Supports Python, JavaScript, TypeScript, Java, C/C++
- Sandboxed Docker execution

### Infrastructure
- **Docker Compose** orchestrates all services
- **Nginx** as reverse proxy for routing
- **Redis** for session caching and Bull queues
- **RabbitMQ** for message queuing

## Data Flow: Student Code Submission

```
Student → Monaco Editor → Submit
    → Backend /submissions POST
    → Judge0 API (async)
    → RabbitMQ queue
    → Worker processes result
    → Socket.IO emit to student
    → Knowledge Tracing updated
```

## Real-time Architecture

```
Instructor opens Live Session
    → WebSocket connect to /session namespace
    → Join room: session-{sessionId}

Student opens Live Lab
    → WebSocket connect
    → Join room: session-{sessionId}
    → Code updates broadcast to instructor
    → Session events (start/end) broadcast to students
```
