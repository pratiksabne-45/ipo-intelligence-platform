"""Data normalization cleaner."""

from app.utils.slug_utils import normalize_company_name, slugify


def normalize_ipo_record(record: dict) -> dict:
    """Apply normalization rules to an IPO record."""
    if "company_name" in record:
        record["company_name_normalized"] = normalize_company_name(
            record["company_name"]
        )
        if "slug" not in record:
            record["slug"] = slugify(record["company_name"])
    return record
