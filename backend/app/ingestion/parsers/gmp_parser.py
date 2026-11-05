"""GMP data parser."""

import logging
from decimal import Decimal, InvalidOperation
from typing import Any

logger = logging.getLogger(__name__)


class GMPParser:
    def parse(self, raw: dict[str, Any]) -> dict[str, Any] | None:
        """
        Parse a raw GMP observation.
        Preserves the original raw_value for audit purposes.
        """
        raw_value = raw.get("gmp", "")
        try:
            gmp_amount = Decimal(
                str(raw_value).replace("₹", "").replace(",", "").strip()
            )
        except InvalidOperation:
            logger.warning("Cannot parse GMP value: %r", raw_value)
            return None
        return {
            "gmp_amount": gmp_amount,
            "source_name": raw.get("source_name", "unknown"),
            "raw_value": str(raw_value),
            "source_reference": raw.get("source_url"),
        }
