# API Documentation

## Base URL & Versioning

- Base URL: `http://localhost:8000`
- Current Version: `v1`
- API Prefix: `/api/v1`
- Interactive OpenAPI Docs: `http://localhost:8000/api/docs`
- ReDoc UI: `http://localhost:8000/api/redoc`
- OpenAPI JSON Spec: `http://localhost:8000/api/openapi.json`

---

## Standard Response Format

Successful responses return JSON payloads adhering to Pydantic schemas. Standard error responses follow this structure:

```json
{
  "detail": "Description of the error",
  "error_type": "NotFoundError"
}
```

HTTP Status Codes:
- `200 OK`: Request succeeded.
- `404 Not Found`: Requested entity does not exist.
- `422 Unprocessable Entity`: Validation error in payload or query params.
- `500 Internal Server Error`: Server exception.

---

## Endpoints

### 1. System Health

#### `GET /api/v1/health`
Checks backend uptime and database connectivity.

**Response (200 OK):**
```json
{
  "status": "ok",
  "app": "IPO Intelligence Platform",
  "version": "0.1.0",
  "environment": "development",
  "timestamp": "2026-11-05T20:25:00.000000+00:00",
  "database": "connected"
}
```

---

### 2. IPO Management

#### `GET /api/v1/ipos`
List IPOs with optional filtering and pagination.

**Query Parameters:**
- `status` (string, optional): Filter by `upcoming`, `open`, `closed`, `listed`, `withdrawn`.
- `ipo_type` (string, optional): Filter by `mainboard` or `sme`.
- `page` (integer, default: 1): Page number (min 1).
- `page_size` (integer, default: 20): Results per page (min 1, max 100).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "slug": "acme-technologies-ltd",
    "company_name": "Acme Technologies Limited",
    "ipo_type": "mainboard",
    "status": "open",
    "price_band_min": "450.00",
    "price_band_max": "475.00",
    "open_date": "2026-11-10",
    "close_date": "2026-11-12",
    "listing_date": "2026-11-18"
  }
]
```

#### `GET /api/v1/ipos/{slug}`
Retrieve detailed specifications of an individual IPO by unique slug.

**Path Parameters:**
- `slug` (string, required): Unique URL-safe slug.

**Response (200 OK):**
```json
{
  "id": 1,
  "slug": "acme-technologies-ltd",
  "company_name": "Acme Technologies Limited",
  "ipo_type": "mainboard",
  "status": "open",
  "price_band_min": "450.00",
  "price_band_max": "475.00",
  "issue_price": "475.00",
  "lot_size": 30,
  "issue_size_cr": "1250.00",
  "open_date": "2026-11-10",
  "close_date": "2026-11-12",
  "allotment_date": "2026-11-15",
  "listing_date": "2026-11-18",
  "exchange": "NSE+BSE",
  "registrar": "Link Intime India Pvt Ltd",
  "created_at": "2026-11-01T10:00:00Z",
  "updated_at": "2026-11-05T12:00:00Z"
}
```

---

### 3. Grey Market Premium (GMP)

#### `GET /api/v1/gmp/{ipo_id}/history`
Fetches chronological GMP observations for an IPO.

**Path Parameters:**
- `ipo_id` (integer, required): IPO primary key.

**Query Parameters:**
- `limit` (integer, default: 50, max: 200): Maximum records to retrieve.

**Response (200 OK):**
```json
[
  {
    "id": 105,
    "ipo_id": 1,
    "gmp_amount": "85.00",
    "estimated_listing_price": "560.00",
    "gmp_percentage": "17.8947",
    "source_name": "verified_dealer_network",
    "observation_timestamp": "2026-11-05T14:30:00Z",
    "collection_timestamp": "2026-11-05T14:35:12Z",
    "is_verified": true,
    "is_stale": false,
    "is_outlier": false
  }
]
```

---

### 4. Subscription Tracking

#### `GET /api/v1/subscriptions/{ipo_id}`
Returns day-by-day bidding subscription multiples for an IPO.

**Response (200 OK):**
```json
[
  {
    "id": 201,
    "ipo_id": 1,
    "subscription_date": "2026-11-10",
    "qib_times": "2.1400",
    "nii_times": "4.8500",
    "rii_times": "6.2200",
    "employee_times": "1.1000",
    "total_times": "4.5600",
    "source_name": "nse",
    "collection_timestamp": "2026-11-10T17:30:00Z"
  }
]
```

---

### 5. Administrative Endpoints

#### `GET /api/v1/admin/status`
Returns administrative service readiness. Full RBAC authentication will be configured in Milestone 3.
