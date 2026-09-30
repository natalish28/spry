# Spry Monorepo Specification

## Structure
- backend/ (FastAPI, SQLAlchemy, Alembic)
- frontend/ (React, Vite)
- docker-compose.yml at the root

## API Contract
- GET /api/meetings -> List of meetings: [{id, title, starts_at, ends_at, attendee_count}]
- POST /api/meetings -> Creates a meeting: {title, starts_at, ends_at, attendee_count}
