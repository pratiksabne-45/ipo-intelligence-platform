"""Deduplication logic for ingested IPO records."""

from app.utils.slug_utils import normalize_company_name


def compute_dedup_key(company_name: str, open_date: str | None = None) -> str:
    """Compute a deduplication key for an IPO record."""
    normalized = normalize_company_name(company_name)
    if open_date:
        return f"{normalized}::{open_date}"
    return normalized
