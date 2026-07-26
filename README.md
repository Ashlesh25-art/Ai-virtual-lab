# AI Virtual Lab

An intelligent, full-stack virtual laboratory platform for educational institutions featuring real-time code execution, AI-powered hints, automated grading, and comprehensive analytics.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 + React 19 + TypeScript |
| Backend | NestJS + Prisma + PostgreSQL |
| AI Services | FastAPI (Python) + Groq LLM |
| Code Execution | Judge0 (self-hosted) |
| Real-time | Socket.IO |
| Message Queue | RabbitMQ |
| Infrastructure | Docker + Nginx |

## Project Structure

```
ai-virtual-lab/
├── frontend/        # Next.js 15 app
├── backend/         # NestJS REST API + WebSocket gateway
├── ai-services/     # FastAPI AI microservices
├── infra/           # Docker & Nginx configs
└── docs/            # Architecture & API docs
```

## Getting Started

```bash
# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up -d
```

## Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **AI Services**: http://localhost:8000–8006
- **Judge0**: http://localhost:2358

## Documentation

- [Architecture](docs/architecture.md)
- [API Documentation](docs/api-documentation.md)
- [Database Schema](docs/database-schema.md)
