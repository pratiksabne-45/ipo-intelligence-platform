"""Ingestion-time data validation."""

from typing import Any


def validate_ipo_record(record: dict[str, Any]) -> list[str]:
    """Return a list of validation errors for an IPO record."""
    errors = []
    if not record.get("company_name"):
        errors.append("Missing required field: company_name")
    if record.get("price_band_min") and record.get("price_band_max"):
        if record["price_band_min"] > record["price_band_max"]:
            errors.append("price_band_min must not exceed price_band_max")
    if record.get("open_date") and record.get("close_date"):
        if record["open_date"] > record["close_date"]:
            errors.append("open_date must not be after close_date")
    return errors
