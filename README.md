# IPO Intelligence Platform

A production-quality Indian IPO information platform providing Grey Market Premium (GMP) data, subscription statistics, upcoming IPO information, allotment data, and educational resources.

---

## Overview

IPO Intelligence aggregates public information about Initial Public Offerings listed on Indian stock exchanges (NSE and BSE). The platform presents:

- **GMP (Grey Market Premium)** data with historical trends
- **Subscription statistics** (QIB, NII, RII, Total)
- **Upcoming IPO calendar** with filtering and search
- **Allotment status** lookup
- **Educational content** about the IPO process

> **GMP Data Notice**: Grey Market Premium data is unofficial information sourced from grey market participants. It does not represent official exchange data and does not guarantee any listing price. All GMP data on this platform is clearly labelled as an unofficial estimate.

---

## Architecture

The platform uses a two-tier architecture: a **Next.js frontend** communicates with a **FastAPI backend** via a REST API. **PostgreSQL** stores all persistent data. Data is collected through pluggable **provider adapters** that implement a common `BaseDataProvider` interface, making it straightforward to add or swap data sources.

```
┌─────────────────────────────────────┐
│          Next.js Frontend           │
│    (React, TypeScript, Tailwind)    │
└──────────────┬──────────────────────┘
               │ REST API
               ▼
┌─────────────────────────────────────┐
│          FastAPI Backend            │
│     (Python, SQLAlchemy, Pydantic)  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│           PostgreSQL 16             │
└─────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15 (App Router) | React framework with SSR/SSG |
| React | 19 | UI library |
| TypeScript | 5 | Static typing |
| Tailwind CSS | v3 | Utility-first styling |
| shadcn/ui | latest | Accessible component library |
| Recharts | latest | Data visualisation (charts) |
| React Hook Form + Zod | latest | Form management and validation |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Python | 3.11+ | Runtime |
| FastAPI | 0.115+ | Async web framework |
| Pydantic | v2 | Data validation and serialisation |
| SQLAlchemy | 2.0 (async) | ORM and database abstraction |
| Alembic | latest | Database migration management |
| PostgreSQL | 16 | Primary data store |
| HTTPX | latest | Async HTTP client for data collection |
| Pytest | latest | Testing framework |
| Ruff | latest | Linter and code formatter |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| Docker & Docker Compose | PostgreSQL containerisation |
| GitHub Actions | CI/CD pipeline |

---

## Repository Structure

```
ipo-intelligence-platform/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── backend/                    # FastAPI Python backend
│   ├── app/
│   │   ├── api/                # Route handlers (controllers)
│   │   ├── core/               # Settings, database, logging
│   │   ├── models/             # SQLAlchemy ORM models
│   │   ├── schemas/            # Pydantic request/response schemas
│   │   ├── services/           # Business logic layer
│   │   ├── repositories/       # Database access layer
│   │   └── data_pipeline/      # Provider adapters and ingestion
│   ├── alembic/                # Database migration scripts
│   ├── tests/                  # Pytest test suite
│   ├── requirements.txt
│   ├── .env.example
│   └── pyproject.toml
├── frontend/                   # Next.js TypeScript frontend
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # Shared UI components
│   ├── lib/                    # API client, utilities
│   ├── public/                 # Static assets
│   ├── package.json
│   └── .env.local.example
├── docs/                       # Project documentation
│   ├── architecture.md
│   ├── database-schema.md
│   ├── data-sources.md
│   ├── data-pipeline.md
│   ├── api-documentation.md
│   ├── development-setup.md
│   └── deployment.md
├── docker-compose.yml          # PostgreSQL service definition
├── .editorconfig
├── .gitignore
└── README.md
```

---

## Prerequisites

Before setting up the project locally, ensure the following are installed:

| Requirement | Minimum Version | Check command |
|------------|----------------|---------------|
| Python | 3.11+ | `python --version` |
| Node.js | 20+ | `node --version` |
| npm | 10+ | `npm --version` |
| Docker Desktop | latest | `docker --version` |
| Git | any | `git --version` |

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ipo-intelligence-platform
```

### 2. Start PostgreSQL

```bash
docker compose up -d postgres
```

Verify it is healthy:

```bash
docker compose ps
```

---

### 3. Backend Setup

**Linux / macOS:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your settings
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

**Windows PowerShell:**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
# Edit .env with your settings
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`.

---

### 4. Frontend Setup

**Linux / macOS:**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

**Windows PowerShell:**
```powershell
cd frontend
npm install
Copy-Item .env.local.example .env.local
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

### 5. Verify Everything Is Running

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API (interactive docs) | http://localhost:8000/api/docs |
| Health check | http://localhost:8000/api/v1/health |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL async connection string | `postgresql+asyncpg://ipo_user:ipo_password@localhost:5432/ipo_db` |
| `APP_ENV` | Runtime environment | `development` |
| `SECRET_KEY` | JWT signing key — **change in production** | *(64-char random hex)* |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |
| `LOG_LEVEL` | Python logging level | `INFO` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO metadata | `https://ipointelligence.in` |

---

## Running Tests

### Backend

```bash
cd backend
pytest tests/ -v
```

To run with coverage:

```bash
pytest tests/ -v --cov=app --cov-report=html
```

### Frontend

```bash
cd frontend
npm run lint        # ESLint
npm run type-check  # TypeScript compiler check
npm run build       # Verify production build succeeds
```

---

## Development Roadmap

### Milestone 1 (Current) — Foundation
- [x] Project architecture and folder structure
- [x] FastAPI backend with health endpoint
- [x] Database models (IPO, GMP, Subscription, etc.)
- [x] Next.js frontend skeleton with responsive layout
- [x] Docker Compose for PostgreSQL
- [x] CI/CD pipeline

### Milestone 2 — Data Pipeline
- [ ] Identify and verify public IPO data sources
- [ ] Implement NSE and BSE provider adapters
- [ ] GMP data collection strategy (requires source verification)
- [ ] Background job scheduler
- [ ] Admin data entry interface

### Milestone 3 — Public Features
- [ ] Live GMP table with historical trends
- [ ] Subscription data tracking
- [ ] IPO allotment status checker
- [ ] IPO calendar and filtering
- [ ] Performance charts

### Milestone 4 — Growth
- [ ] SEO optimisation
- [ ] Google Analytics integration
- [ ] Google AdSense integration
- [ ] Mobile app consideration
- [ ] Email alerts

---

## Important Notes

> **GMP Data Notice**: Grey Market Premium (GMP) is unofficial data from grey market participants. It does not represent official exchange data and does not guarantee any listing price. This platform clearly labels all GMP data as unofficial estimates.

> **Data Sources**: Actual data collection from NSE, BSE and GMP providers requires verifying API access, terms of use, and data licensing before implementation. No data scraping is performed in Milestone 1.

---

## Contributing

1. Fork the repository and create a feature branch from `develop`.
2. Ensure all CI checks pass locally before opening a pull request.
3. Write or update tests for any new functionality.
4. Follow the code style enforced by Ruff (backend) and ESLint (frontend).

---

## Licence

MIT Licence — see `LICENCE` file for details.
