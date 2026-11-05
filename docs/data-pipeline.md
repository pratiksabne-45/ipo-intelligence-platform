# Data Pipeline Architecture

## 1. Overview

The Indian IPO Intelligence Platform data ingestion pipeline is designed with data integrity, auditability, and modularity at its core. It isolates source-specific fetching logic from domain models and data cleaning processes.

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Source Adapters │ ──> │   Parser Layer   │ ──> │  Cleaner / Normal│
│  (NSE, BSE, GMP) │     │  (Field Extract) │     │  (Dedup & Valid) │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                                                            │
                                                            ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Audit & Fetch Log│ <── │ Database Layer   │ <── │ Pipeline Manager │
│ (Execution Stats)│     │ (Append-only GMP)│     │ (Orchestration)  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

---

## 2. BaseDataProvider Abstraction

Every source adapter extends `BaseDataProvider`:

```python
class BaseDataProvider(ABC):
    source_name: str

    @abstractmethod
    async def fetch_ipo_list(self) -> list[dict[str, Any]]: ...

    @abstractmethod
    async def fetch_ipo_detail(self, identifier: str) -> dict[str, Any] | None: ...

    @abstractmethod
    async def health_check(self) -> bool: ...
```

This guarantees that:
- Core business services never interact with raw external HTTP responses.
- Any provider can be added, updated, or removed without breaking downstream storage or API logic.
- Source errors and network timeouts are encapsulated within provider implementations.

---

## 3. Data Cleaning & Normalization Pipeline

### 3.1 Company Name Normalization
- Converts names to uppercase.
- Strips legal entity suffixes (`LIMITED`, `LTD`, `PVT`, `PRIVATE LIMITED`, `LLP`).
- Removes redundant whitespace, punctuation, and Unicode symbols.
- Produces normalized keys for deduplication (`company_name_normalized`).

### 3.2 URL Slug Generation
- Deterministic slug generation matching the company name.
- Handles collisions by appending incremental suffixes (`-1`, `-2`).

### 3.3 Indian Currency & Number Parsing
- Converts Indian numerical formats into standardized numerical values:
  - `₹1,250.50 Cr` -> `Decimal('1250.50')` (Crores base for issue size)
  - `45 Lakh` -> `Decimal('0.45')` Crores
  - `₹450` -> `Decimal('450.00')` (Per-share price)

### 3.4 Date & Time Handling
- Parses various Indian financial date formats (`DD-MM-YYYY`, `DD/MM/YYYY`, `DD Mon YYYY`).
- Ingestion timestamps are strictly recorded in **UTC**.
- Presentation formats convert UTC to **Asia/Kolkata (IST)**.

---

## 4. Grey Market Premium (GMP) Integrity Rules

1. **Append-Only History**: Under no circumstances is a previous GMP observation overwritten or mutated. Every reading is a point-in-time observation.
2. **Missing is Not Zero**: A missing or unverified GMP quote is stored as `None` or omitted, never recorded as ₹0.
3. **Outlier Detection**: GMP quotes exceeding 200% of the upper price band or deviating more than 3 standard deviations from recent observations are flagged with `is_outlier=True`.
4. **Data Freshness**: Observations older than 24 hours during an active issue window are flagged with `is_stale=True`.
5. **Raw Data Provenance**: Original unparsed strings (`raw_value`) and source URLs are persisted alongside normalized numbers for auditability.

---

## 5. Audit Logging (`DataFetchLog`)

Every pipeline execution records:
- `source_name`: Data source identifier.
- `fetch_type`: `ipo`, `gmp`, or `subscription`.
- `status`: `success`, `partial`, or `failed`.
- `records_fetched`, `records_inserted`, `records_skipped`.
- `error_message`: Full trace if failures occurred.
- `started_at` & `completed_at`: High-resolution execution window.

---

## 6. Execution & Scheduling

Milestone 1 establishes the structural interfaces, parsers, and pipelines. In Milestone 2, jobs will run periodically via asynchronous schedulers (APScheduler / Celery Workers):
- **IPO Master Data**: Twice daily (08:00 IST and 18:00 IST).
- **Subscription Data**: Every 30 minutes during bidding hours (10:00 to 17:00 IST).
- **GMP Observations**: Configurable intervals from verified community sources.
