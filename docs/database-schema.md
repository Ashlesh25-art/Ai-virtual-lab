# Database Schema

Generated from `backend/src/prisma/schema.prisma` using PostgreSQL.

## Entity Relationship Overview

```
AcademicYear ──< Batch ──< Section ──< StudentProfile >── User
Department ──< Subject ──< Experiment ──< Task ──< TestCase
Department ──< InstructorProfile >── User
Section ──< Session >── Experiment
Session ──< Submission >── User (Student)
Session ──< Attendance >── User (Student)
User ──< Notification
User ──< Certificate
Experiment ──< Content
```

## Tables

### users
| Column | Type | Notes |
|---|---|---|
| id | CUID | Primary key |
| email | String | Unique |
| name | String | |
| passwordHash | String | bcrypt |
| role | Enum | ADMIN, INSTRUCTOR, STUDENT |
| isActive | Boolean | Default true |
| createdAt | DateTime | |
| updatedAt | DateTime | |

### student_profiles
| Column | Type | Notes |
|---|---|---|
| id | CUID | |
| userId | CUID | FK → users |
| rollNumber | String | Unique |
| sectionId | CUID | FK → sections |

### instructor_profiles
| Column | Type | Notes |
|---|---|---|
| id | CUID | |
| userId | CUID | FK → users |
| employeeId | String | Unique |
| departmentId | CUID | FK → departments |

### academic_years
| Column | Type | Notes |
|---|---|---|
| id | CUID | |
| name | String | Unique (e.g. "2024-25") |
| startDate | DateTime | |
| endDate | DateTime | |
| isActive | Boolean | |

### departments, batches, sections, subjects
Standard lookup tables with FK relationships.

### experiments
| Column | Type | Notes |
|---|---|---|
| id | CUID | |
| title | String | |
| description | String | |
| subjectId | CUID | FK → subjects |
| createdById | CUID | FK → users |

### tasks
| Column | Type | Notes |
|---|---|---|
| id | CUID | |
| experimentId | CUID | FK → experiments |
| title | String | |
| description | String | |
| starterCode | String? | Optional boilerplate |
| order | Int | Task sequence |

### test_cases
| Column | Type | Notes |
|---|---|---|
| id | CUID | |
| taskId | CUID | FK → tasks |
| input | String | |
| expectedOutput | String | |
| isHidden | Boolean | Hidden from students |

### sessions
| Column | Type | Notes |
|---|---|---|
| id | CUID | |
| experimentId | CUID | |
| sectionId | CUID | |
| scheduledAt | DateTime | |
| startedAt | DateTime? | |
| endedAt | DateTime? | |
| status | Enum | SCHEDULED, ACTIVE, COMPLETED, CANCELLED |

### submissions
| Column | Type | Notes |
|---|---|---|
| id | CUID | |
| sessionId | CUID | |
| studentId | CUID | |
| taskId | CUID | |
| code | String | |
| language | String | |
| status | Enum | PENDING, RUNNING, ACCEPTED, WRONG_ANSWER, etc. |
| score | Float? | After grading |
| judge0Token | String? | For polling results |

### attendance, notifications, certificates, content
Supporting tables as defined in `schema.prisma`.
