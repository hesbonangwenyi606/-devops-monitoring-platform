# DevOps Monitoring Platform - devops-monitoring-platform

This repository is a ready-to-run scaffold for a DevOps Monitoring Platform using Postgres, Prometheus, Grafana, a Node.js backend (Prisma ORM), and a React frontend.

Quick start:

1. Copy `.env.example` to `backend/.env` and adjust values if needed.
2. Run:

```bash
docker compose up --build
```

3. Inside the backend container run Prisma migrations:

```bash
docker compose exec backend sh
npx prisma generate
npx prisma migrate deploy
```

4. Bootstrap a user via `POST /api/auth/register` or insert into DB.

Access services:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000 (admin/admin)
# -devops-monitoring-platform
