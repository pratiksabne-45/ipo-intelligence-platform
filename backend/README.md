# Indian IPO Intelligence Platform — Backend

Asynchronous REST API built with FastAPI, SQLAlchemy 2, Pydantic v2, and PostgreSQL.

## Architecture Highlights

- **FastAPI**: High performance async endpoints with auto-generated OpenAPI documentation.
- **SQLAlchemy 2.0**: Pure async ORM models with strict typing and declarative bases.
- **Alembic**: Database migrations with asyncpg engine.
- **Data Ingestion Layer**: Abstracted `BaseDataProvider` with dedicated adapters (NSE, BSE, Filings, GMP).
- **Append-Only GMP**: Strict historical preservation of all GMP observations.
- **Ruff & Pytest**: Modern Python linting, formatting, and unit/integration testing suite.

## Development Setup

```bash
# 1. Virtual environment
python -m venv venv
# Linux/macOS:
source venv/bin/activate
# Windows:
.\venv\Scripts\Activate.ps1

# 2. Dependencies
pip install -r requirements.txt

# 3. Environment configuration
cp .env.example .env

# 4. Migrations
alembic upgrade head

# 5. Run Server
uvicorn app.main:app --reload --port 8000
```

## Running Tests & Linters

```bash
pytest tests/ -v
ruff check .
ruff format --check .
```
