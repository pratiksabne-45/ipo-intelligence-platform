"""Currency parsing utilities for Indian financial data."""

import re
from decimal import Decimal, InvalidOperation


def parse_inr_amount(value: str | None) -> Decimal | None:
    """
    Parse Indian currency strings like '₹100.50', '1,234.56 Cr', '45 Lakh'.
    Returns value in the base unit (INR for small amounts, Crores for issue sizes).
    """
    if not value:
        return None
    cleaned = re.sub(r"[₹,\s]", "", str(value))
    multiplier = Decimal("1")
    if "cr" in cleaned.lower():
        multiplier = Decimal("1")
        cleaned = re.sub(r"(?i)cr(ores?)?\.?", "", cleaned)
    elif "lakh" in cleaned.lower() or "lac" in cleaned.lower():
        multiplier = Decimal("0.01")
        cleaned = re.sub(r"(?i)(lakh|lac)s?\.?", "", cleaned)
    cleaned = cleaned.strip()
    try:
        return Decimal(cleaned) * multiplier
    except InvalidOperation:
        return None


def crores_to_inr(crores: Decimal) -> Decimal:
    return crores * Decimal("10000000")
