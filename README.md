# AI Virtual Lab (TYLET) 🧪⚡

> An intelligent, end-to-end virtual laboratory platform for educational institutions featuring real-time sandboxed code execution, AI-powered tutoring, automated grading, proctoring, knowledge tracing, and comprehensive academic administration.

---

## 🌟 Platform Vision

**AI Virtual Lab** connects **Students**, **Instructors**, and **Department Administrators** into a seamless, intelligent learning ecosystem. Designed with modern glassmorphism aesthetics, real-time code evaluation, and deep AI integration, the platform transforms engineering education into an interactive, measurable experience.

---

## 🚀 Core Institutional Workflows

The platform is engineered around **8 end-to-end institutional workflows**:

```
[Workflow 1: Academic Setup & Allocation (Admin)]
         │
         ▼
[Workflow 2: Author Experiment & Pre-Lab Gate (Instructor)]
         │
         ▼
[Workflow 3: Schedule Lab Session & Notify Students (Instructor)]
         │
         ▼
[Workflow 4: Pre-Lab Quiz Gate & Lock Verification (Student)]
         │
         ▼
[Workflow 5: Live Lab Session, Code Execution & AI Hints (Student + Instructor)]
         │
         ▼
[Workflow 6: AI Auto-Grading, Lab Report & Oral Viva (Instructor)]
         │
         ▼
[Workflow 7: Catch-Up Mode for Absent/Late Learners (Student + Instructor)]
         │
         ▼
[Workflow 8: Knowledge Intelligence & Analytics (All Roles)]
```

### 1. **Academic Setup & Faculty Allocation (Admin)**
- Configure Academic Years (e.g. 2026–27), Batches, Departments (CSE, ECE, ME, EEE), Sections, and Subjects.
- Allocate instructors to subject-section pairs with granular permissions.

### 2. **Content & Experiment Preparation (Instructor)**
- Author experiments with aims, theoretical manuals, code templates, visible/hidden test cases, and CO/PO mapping.
- Attach media assets (videos, PDFs, starter code) and set Pre-Lab quiz gate thresholds (e.g., 75% score required).

### 3. **Session Scheduling & Automation (Instructor)**
- Schedule live lab sessions for specific sections with automated calendar invites, late-join rules, and multi-channel reminders.

### 4. **Pre-Lab Preparation & Gate Locking (Student)**
- Students study background theory, watch instructional walkthroughs, and take pre-lab quizzes to unlock live coding access.

### 5. **Live Lab Execution & AI Hint Engine (Student + Instructor)**
- Integrated **Monaco Editor** backed by **Judge0** API for multi-language sandboxed code execution (Python, C++, Java, C, SQL).
- **Groq LLM-Powered AI Tutor**: Delivers progressive, non-spoiler hints based on code diffs without revealing direct answers.
- **MediaPipe Proctoring**: Real-time facial focus detection alerts instructors of student distraction.
- **Instructor Control Room**: Live code inspection streams, broadcast announcements, and 1-on-1 private help channels.

### 6. **Post-Session Auto-Grading & Viva Examination (Instructor)**
- Automated code test-case verification + lab report evaluation.
- Post-lab oral Viva examination panel with AI-recommended questioning strategies.

### 7. **Catch-Up Mode (Student + Instructor)**
- Absent or late students watch recorded lab sessions, complete catch-up quizzes, and submit overdue code with instructor approval.

### 8. **Knowledge Intelligence Engine & Analytics (All Roles)**
- **DKVMN (Dynamic Key-Value Memory Networks)** model tracks student concept mastery over time.
- Real-time leaderboard rankings, department performance bars, audit logs, and PDF/CSV report generation.

---

## 🛠️ Architecture & Tech Stack

```
                                  ┌────────────────────────┐
                                  │   Next.js 15 App       │
                                  │ (Glassmorphism Frontend)│
                                  └───────────┬────────────┘
                                              │ REST / WebSockets
                                              ▼
                                  ┌────────────────────────┐
                                  │  NestJS Backend API    │
                                  │ (Auth, Prisma, Redis)  │
                                  └───────────┬────────────┘
                                              │
         ┌────────────────────────────────────┼────────────────────────────────────┐
         │                                    │                                    │
         ▼                                    ▼                                    ▼
┌─────────────────┐                  ┌──────────────────┐                ┌──────────────────┐
│  Judge0 API     │                  │  Python FastAPI  │                │  PostgreSQL      │
│ Code Execution  │                  │  AI Services     │                │  Main Database   │
└─────────────────┘                  └──────────────────┘                └──────────────────┘
```

| Component | Technology Used |
|---|---|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Vanilla CSS Modules (Glassmorphism design system), Lucide React icons, Monaco Editor |
| **Backend API** | NestJS (TypeScript), Prisma ORM, WebSockets (Socket.io), Redis (session caching & queues) |
| **AI / ML Microservices** | Python FastAPI, Groq LLM API, DKVMN Knowledge Tracing, MediaPipe (Face Detection) |
| **Code Execution Engine** | Judge0 (sandboxed Docker container API) |
| **Database** | PostgreSQL 16 |
| **Infrastructure** | Docker, Docker Compose, Nginx |

---

## 🎨 Portals Overview

### 🎓 Student Portal (`/student`)
- **Dashboard**: Overall performance metric (e.g. 92.5%), study hours sparkline, rank tracking, and upcoming session cards.
- **My Subjects**: Enrolled course syllabus, experiment progress, and pre-lab access buttons.
- **Pre-Lab**: Theory, instructional videos, starter code, and interactive quiz gate.
- **Live Coding Lab**: Dual-pane Monaco IDE, terminal output, AI tutor chat assistant, and test-case runner.
- **Submissions**: Historical submissions, code diffs, score breakdowns, and downloadable lab reports.
- **Rankings & Certificates**: Gamified class leaderboards and verifiable digital achievement certificates.

### 👨‍🏫 Instructor Portal (`/instructor`)
- **Dashboard**: Teaching overview banner, active student roster metrics, pending grading queue, and quick actions.
- **Experiments**: Step-by-step authoring wizard for test cases, CO/PO mapping, and quiz gate setup.
- **Sessions**: Session scheduling manager with automated email/push notifications.
- **Live Lab Control**: Real-time monitor of connected students, camera/mic status, focus score alerts, and live code inspector.
- **Grading & Viva**: AI auto-grading, manual rubric review, and oral viva question helper.
- **Catch-Up Reviews**: Review late student video watching metrics and unlock overdue coding submissions.

### 🛡️ Admin Portal (`/admin`)
- **Dashboard**: System overview banner, college stats, and live lab monitor.
- **Academic Setup**: Configure Academic Years, Batches, Departments, Sections, and Subjects.
- **User Management**: Tabbed directory for Students, Instructors, and Admins with search, filter, and CSV bulk upload.
- **Faculty Allocation**: Assign instructors to subject-section combinations.
- **System Monitoring**: Real-time metrics for Server Health, Docker Containers, Judge0 API, and AI Services + Live log stream.
- **Platform Analytics & Reports**: Performance charts, at-risk student tracking, and PDF/Excel/CSV exports.
- **Security & Settings**: Role permissions matrix, audit logs, authentication configuration, and platform feature toggles.

---

## 📁 Repository Structure

```
Ai-virtual-lab/
├── frontend/                     # Next.js 15 App
│   ├── app/                      # App router pages
│   │   ├── (auth)/login/         # Premium role selector login page
│   │   ├── admin/                # Admin portal pages
│   │   ├── instructor/           # Instructor portal pages
│   │   └── student/              # Student portal pages
│   ├── components/
│   │   └── layout/               # StudentShell, InstructorShell, AdminShell
│   ├── services/                 # API client services
│   └── store/                    # Zustand state management
├── backend/                      # NestJS REST & WebSocket API
│   ├── src/
│   │   ├── modules/              # Auth, Users, Academic, Experiments, Sessions, Submissions
│   │   └── prisma/               # Prisma database schema & migrations
├── ai-services/                  # Python FastAPI microservices
│   ├── hint-service/             # Groq LLM non-spoiler hint generator
│   ├── knowledge-tracing/        # DKVMN concept mastery model
│   └── proctoring/               # MediaPipe face focus detection
├── infra/                        # Docker & Nginx infrastructure
│   └── docker/judge0/            # Judge0 code execution engine
└── docs/                         # Architecture, API & DB Schema documentation
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or higher
- **Python**: `3.10+` (for AI microservices)
- **Docker & Docker Compose** (for Judge0 & PostgreSQL)

### 1. Clone the Repository
```bash
git clone https://github.com/Ashlesh25-art/Ai-virtual-lab.git
cd Ai-virtual-lab
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

### 3. Backend Setup
```bash
cd ../backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```
Backend API will run at [http://localhost:4000](http://localhost:4000).

### 4. AI Microservices Setup
```bash
cd ../ai-services/hint-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 5. Code Execution Engine (Judge0)
```bash
cd ../../infra/docker/judge0
docker-compose up -d
```
Judge0 API will run at [http://localhost:2358](http://localhost:2358).

---

## 🔑 Default Login Roles

To test the application locally:
- **Student**: Select `Student` on `/login` → routes to `/student/dashboard`
- **Teacher**: Select `Teacher` on `/login` → routes to `/instructor/dashboard`
- **Admin**: Select `Admin` on `/login` → routes to `/admin/dashboard`

---

## 📄 License & Attribution

Developed for **HKBK College of Engineering** — AI Virtual Laboratory Platform.
All UI components, microservice architectures, and design tokens are proprietary and maintained for educational excellence.
