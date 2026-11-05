"""IPO data parser — transforms raw source data into normalized dicts."""

import logging
from typing import Any

from app.utils.currency_utils import parse_inr_amount
from app.utils.date_utils import parse_indian_date
from app.utils.slug_utils import normalize_company_name

logger = logging.getLogger(__name__)


class IPOParser:
    def parse(self, raw: dict[str, Any]) -> dict[str, Any]:
        """
        Parse and normalize a raw IPO record from any source.
        Returns a normalized dict suitable for database insertion.
        """
        return {
            "company_name": raw.get("company_name", "").strip(),
            "company_name_normalized": normalize_company_name(
                raw.get("company_name", "")
            ),
            "open_date": parse_indian_date(raw.get("open_date", "")),
            "close_date": parse_indian_date(raw.get("close_date", "")),
            "issue_size_cr": parse_inr_amount(raw.get("issue_size", "")),
        }
