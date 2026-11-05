# Production Deployment Strategy

## 1. Overview

The Indian IPO Intelligence Platform is structured as two independent services:
1. **Frontend**: Next.js 15 App Router (Edge/SSR/SSG capable).
2. **Backend**: FastAPI asynchronous Python service.
3. **Database**: Managed PostgreSQL with connection pooling.

---

## 2. Recommended Production Topologies

### Option A: Cloud Platform as a Service (Vercel + Render / Railway)
- **Frontend**: Deploy on **Vercel** for optimal Next.js edge caching, ISR (Incremental Static Regeneration), and global CDN routing.
- **Backend**: Deploy on **Railway** or **Render** as a containerized web service.
- **Database**: Managed PostgreSQL on Supabase, AWS RDS, or Railway with daily backups.

### Option B: Unified Containerized Deployment (AWS ECS / DigitalOcean Kubernetes)
- Single Docker Compose or Kubernetes deployment with reverse proxy (NGINX / Traefik / Cloudflare).
- Load balancer terminating TLS/SSL certificates (Let's Encrypt / Cloudflare Edge).

---

## 3. Database Migration Strategy in CI/CD

Migrations must be run automatically prior to routing live traffic to the new backend build:

```bash
# In CI/CD deployment step:
alembic upgrade head
```

Guidelines:
- All schema changes must be backwards-compatible (expand-and-contract pattern).
- Do not drop columns in the same release that stops reading them.
- Use explicit foreign key constraints and indexed lookup columns.

---

## 4. Environment Variables & Secrets Management

Store secrets in secure parameter stores (e.g., Doppler, AWS Secrets Manager, or Railway Environment Variables):
- `DATABASE_URL`: Production PostgreSQL async URI.
- `SECRET_KEY`: High-entropy 64+ character random hex string.
- `APP_ENV`: `production`
- `DEBUG`: `false`
- `FRONTEND_URL`: Production domain (e.g. `https://ipointelligence.in`)
- `ALLOWED_ORIGINS`: JSON array of trusted frontend origins.
- `NEXT_PUBLIC_API_BASE_URL`: Production backend API URL.
- `NEXT_PUBLIC_SITE_URL`: Canonical site URL for SEO/Sitemap.

---

## 5. Security & Performance Hardening

- **Content Security Policy (CSP)**: Configure strict headers in Next.js `next.config.ts`.
- **CORS**: Restrict API CORS strictly to production frontend domains.
- **Rate Limiting**: Apply Cloudflare WAF or FastAPI SlowApi rate limiting to prevent scraping abuse.
- **Database Connection Pooling**: Configure PgBouncer in front of PostgreSQL for high concurrent traffic spikes during popular IPO allotment days.
- **Caching**: Implement Redis cache for high-frequency read endpoints (`/ipos`, `/gmp/today`).
