# Architecture — IPO Intelligence Platform

## 1. System Overview

The IPO Intelligence Platform is a two-tier web application that aggregates, stores, and presents Indian IPO data to end users. The system is intentionally kept simple at this stage: a **Next.js frontend** talks to a **FastAPI backend** over a REST API, and all state lives in a single **PostgreSQL 16** database.

```
Browser
  │
  │  HTTPS
  ▼
Next.js Frontend (SSR + Client Components)
  │
  │  REST / JSON (HTTP)
  ▼
FastAPI Backend
  ├── API Layer (routers)
  ├── Service Layer (business logic)
  ├── Repository Layer (database queries)
  └── Data Pipeline (provider adapters → ingestion)
         │
         ▼
     PostgreSQL 16
```

The data pipeline runs as a separate process (background scheduler or manual trigger) and writes directly to PostgreSQL through the repository layer. The API never modifies ingested data; it only reads.

---

## 2. Frontend Architecture

### Framework and Routing

The frontend is built with **Next.js 15** using the **App Router** (`app/` directory). This provides:

- **Server Components** by default — pages render on the server, reducing client-side JavaScript and improving initial load performance.
- **Client Components** opt-in with `"use client"` for interactive elements (charts, forms, dropdowns).
- **Route-based code splitting** — each page segment is a separate chunk.

### Component Structure

```
frontend/app/
├── layout.tsx              # Root layout (header, footer, global providers)
├── page.tsx                # Home page (IPO highlights, GMP snapshot)
├── ipos/
│   ├── page.tsx            # IPO listing with filters
│   └── [slug]/
│       └── page.tsx        # Individual IPO detail page
├── gmp/
│   └── page.tsx            # GMP table with historical chart
├── allotment/
│   └── page.tsx            # Allotment status checker
└── learn/
    └── page.tsx            # Educational content

frontend/components/
├── ui/                     # shadcn/ui primitives (Button, Card, Table, …)
├── layout/                 # Header, Footer, Sidebar, MobileMenu
├── ipo/                    # IPO-specific components (IpoCard, IpoTable, …)
├── gmp/                    # GMPTable, GMPHistoryChart
└── charts/                 # Recharts wrappers
```

### Data Fetching Strategy

| Pattern | Used For |
|---------|----------|
| Server Component `fetch` with `revalidate` | Static/slow data (IPO details, educational pages) |
| `fetch` with `no-store` in Server Components | Real-time data (GMP snapshot on home page) |
| Client-side SWR / React Query | Interactive tables that need live refresh |
| React Hook Form + Zod | Form submission (allotment lookup) |

### Styling

Tailwind CSS v3 provides utility classes. shadcn/ui components use CSS variables for theming, making dark-mode support trivial. All design tokens (colours, radii, spacing) are defined in `tailwind.config.ts`.

---

## 3. Backend Architecture

### Framework

The backend uses **FastAPI 0.115+** with **async/await** throughout. All database operations are asynchronous via SQLAlchemy 2.0 async sessions and `asyncpg`.

### Layered Architecture

```
HTTP Request
     │
     ▼
┌──────────────────────────────┐
│   API Layer (routers/)       │  — route handlers, request/response validation
│   Pydantic schemas           │
└──────────────┬───────────────┘
               │ calls
               ▼
┌──────────────────────────────┐
│   Service Layer (services/)  │  — business logic, orchestration
└──────────────┬───────────────┘
               │ calls
               ▼
┌──────────────────────────────┐
│  Repository Layer (repos/)   │  — SQLAlchemy queries, no business logic
└──────────────┬───────────────┘
               │ async I/O
               ▼
         PostgreSQL 16
```

**Rules:**
- Routers never import repositories directly.
- Services never import FastAPI types (no `Request`, `Response`).
- Repositories never implement business logic.

### Directory Layout

```
backend/app/
├── main.py                  # FastAPI app factory, middleware, router inclusion
├── core/
│   ├── config.py            # Pydantic Settings (reads .env)
│   ├── database.py          # Async engine, session factory
│   └── logging.py           # Structured logging setup
├── api/
│   ├── deps.py              # Dependency injection (get_db, get_current_user)
│   └── v1/
│       ├── router.py        # Aggregates all v1 routers
│       ├── health.py
│       ├── ipos.py
│       ├── gmp.py
│       └── subscriptions.py
├── models/                  # SQLAlchemy ORM models
├── schemas/                 # Pydantic v2 schemas (request/response)
├── services/                # Business logic
├── repositories/            # Database access
└── data_pipeline/           # Adapters, parsers, cleaners, orchestrators
```

### CORS and Middleware

CORS is restricted to `FRONTEND_URL` from environment variables. In production this is the single public domain. In development it defaults to `http://localhost:3000`.

---

## 4. Database Architecture

### Engine

**PostgreSQL 16** is the only supported database. SQLite is not used in production because:
- PostgreSQL native `ENUM` types are used for status fields.
- JSON/JSONB columns store raw provider payloads for provenance.
- Concurrent async writes from the data pipeline require proper connection pooling.

### ORM

**SQLAlchemy 2.0** with the new-style `DeclarativeBase` and `Mapped[T]` type annotations. All queries use async sessions (`AsyncSession`). `asyncpg` is the database driver.

### Migrations

**Alembic** manages schema versions. Key rules:
- Every model change must be accompanied by an Alembic migration.
- `alembic/versions/` **is committed to Git** (not ignored).
- Migrations are run in CI before tests to validate correctness against a real database.
- Production migrations are applied with `alembic upgrade head` before the application process starts.

### Timestamps

All timestamps are stored in **UTC** internally (`TIMESTAMP WITH TIME ZONE`). The API returns UTC ISO 8601 strings. The frontend converts to IST for display using the browser's `Intl.DateTimeFormat` API.

---

## 5. Data Pipeline Architecture

### Design Philosophy

The data pipeline is decoupled from the API server. It runs as a separate process (initially triggered manually, later via a background scheduler such as APScheduler or a cron job). It writes to the same PostgreSQL database through the repository layer.

### BaseDataProvider

All data sources implement a common interface:

```python
class BaseDataProvider(ABC):
    @abstractmethod
    async def fetch_ipos(self) -> list[RawIPOData]: ...

    @abstractmethod
    async def fetch_gmp(self, ipo_id: int) -> list[RawGMPData]: ...

    @property
    @abstractmethod
    def source_name(self) -> str: ...
```

### Pipeline Stages

```
Provider Adapters → Parsers → Cleaners → Repositories
      │                 │          │            │
  Raw HTTP         Structured   Validated    Stored in
  responses        Python       & dedupe'd   PostgreSQL
                   objects      records
```

1. **Provider Adapters** — HTTP calls to external sources, returning raw bytes/JSON.
2. **Parsers** — convert raw data into typed Python dataclasses (`RawIPOData`, `RawGMPData`).
3. **Cleaners** — normalise, validate, and flag duplicates or outliers.
4. **Ingestion Orchestrators** — coordinate the stages and write via repositories.

---

## 6. Data Quality Principles

| Principle | Implementation |
|-----------|---------------|
| **Append-only GMP history** | `GMPHistory` rows are never updated or deleted. Each observation is a new row with a timestamp. |
| **Provenance tracking** | Every row records `source_name`, `source_reference`, and `raw_value` (original JSON). |
| **Duplicate detection** | Before inserting, the ingestion pipeline checks for an existing row with the same `ipo_id`, `source_name`, and `observation_timestamp`. Duplicates are logged and skipped (`records_skipped`). |
| **Outlier flagging** | GMP values that deviate more than 3 standard deviations from the recent median are flagged `is_outlier = true` and not shown by default. |
| **Stale data flagging** | GMP rows older than a configurable threshold (default 48 hours) are flagged `is_stale = true`. |
| **Verification flag** | Critical IPO fields (price band, lot size, dates) can be marked `is_verified = true` after cross-referencing with official SEBI/exchange filings. |

---

## 7. Security Architecture

### Current State (Development)

- **CORS** restricted to `FRONTEND_URL`.
- **Environment variables** for all secrets — no credentials in code or Git.
- **SECRET_KEY** required for future JWT signing.
- No authentication on API endpoints in Milestone 1 (read-only public data).

### Planned

- JWT-based authentication for admin endpoints (data correction, source management).
- Rate limiting with `slowapi` on the FastAPI side.
- Input sanitisation via Pydantic v2 strict mode.

---

## 8. Scalability Considerations

The current architecture is intentionally simple. As traffic grows:

| Concern | Current | Future |
|---------|---------|--------|
| Database | Single PostgreSQL | Read replicas for heavy read load |
| API server | Single Uvicorn process | Multiple workers behind a load balancer |
| Data pipeline | Manual / cron | Celery + Redis for distributed task queue |
| Frontend | Vercel / single host | CDN edge caching for static pages |
| Caching | None | Redis cache for frequently read IPO lists |

The layered architecture (API → Service → Repository) ensures the Service and Repository layers can be reused by worker processes without modification.
