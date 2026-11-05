"""Date and timezone utilities."""

import zoneinfo
from datetime import UTC, date, datetime

IST = zoneinfo.ZoneInfo("Asia/Kolkata")
UTC = UTC


def utc_now() -> datetime:
    return datetime.now(UTC)


def to_ist(dt: datetime) -> datetime:
    """Convert UTC datetime to IST for display."""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=UTC)
    return dt.astimezone(IST)


def parse_indian_date(date_str: str | None) -> date | None:
    """Parse common Indian date formats like DD-MM-YYYY or DD/MM/YYYY."""
    if not date_str:
        return None
    for fmt in ("%d-%m-%Y", "%d/%m/%Y", "%Y-%m-%d", "%d %b %Y", "%d-%b-%Y"):
        try:
            return datetime.strptime(date_str.strip(), fmt).date()
        except ValueError:
            continue
    return None
