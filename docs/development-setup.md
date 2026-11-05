# Local Development Setup Guide

This guide walks you through setting up the complete Indian IPO Intelligence Platform on your local workstation.

---

## 1. System Requirements

Ensure the following tools are installed:
- **Git** >= 2.40
- **Node.js** >= 20.0.0 (`node -v`)
- **npm** >= 10.0.0 (`npm -v`)
- **Python** >= 3.11 (`python --version`)
- **Docker Desktop** (or Docker Engine with Compose v2)

---

## 2. Clone the Repository

```bash
git clone <repository-url>
cd ipo-intelligence-platform
```

---

## 3. Start PostgreSQL Database

We use Docker Compose to manage an isolated PostgreSQL 16 instance.

### Windows (PowerShell) / Linux / macOS:
```bash
docker compose up -d postgres
```

Verify that the database container is running and healthy:
```bash
docker compose ps
```

---

## 4. Backend Setup (FastAPI & SQLAlchemy)

### 4.1 Create Virtual Environment & Install Dependencies

**Linux / macOS:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

**Windows (PowerShell):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
```

### 4.2 Configure Environment Variables

```bash
# In the backend/ folder:
cp .env.example .env    # Linux/macOS
Copy-Item .env.example .env  # Windows PowerShell
```

Verify default database credentials in `.env`:
```env
DATABASE_URL=postgresql+asyncpg://ipo_user:ipo_password@localhost:5432/ipo_db
APP_ENV=development
LOG_LEVEL=INFO
SECRET_KEY=CHANGE_ME_IN_PRODUCTION
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=["http://localhost:3000"]
```

### 4.3 Run Migrations

```bash
alembic upgrade head
```

### 4.4 Launch FastAPI Development Server

```bash
uvicorn app.main:app --reload --port 8000
```

Verify backend health:
- Browser/cURL: `http://localhost:8000/api/v1/health`
- Swagger Documentation: `http://localhost:8000/api/docs`

---

## 5. Frontend Setup (Next.js 15)

Open a new terminal window/tab.

### 5.1 Install NPM Dependencies

```bash
cd frontend
npm install
```

### 5.2 Configure Environment Variables

```bash
# In the frontend/ folder:
cp .env.local.example .env.local    # Linux/macOS
Copy-Item .env.local.example .env.local  # Windows PowerShell
```

The default values match the local backend:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5.3 Launch Next.js Dev Server

```bash
npm run dev
```

Visit the application at:
- Web App: `http://localhost:3000`
- Frontend Health Route: `http://localhost:3000/api/health`

---

## 6. Running Tests & Quality Checks

### Backend Quality Suite:
```bash
cd backend
# Run test suite
pytest tests/ -v

# Run lint checks
ruff check .

# Run format checks
ruff format --check .
```

### Frontend Quality Suite:
```bash
cd frontend
# Run ESLint
npm run lint

# TypeScript verification
npm run type-check

# Test production build
npm run build
```
