"""Data validation service for ingested data."""

import logging
from datetime import date
from decimal import Decimal

logger = logging.getLogger(__name__)


class ValidationService:
    @staticmethod
    def is_valid_price_band(
        min_price: Decimal | None, max_price: Decimal | None
    ) -> bool:
        if min_price is None or max_price is None:
            return False
        return 0 < min_price <= max_price

    @staticmethod
    def is_valid_lot_size(lot_size: int | None) -> bool:
        if lot_size is None:
            return False
        return 0 < lot_size <= 100000

    @staticmethod
    def is_valid_date_range(open_date: date | None, close_date: date | None) -> bool:
        if open_date is None or close_date is None:
            return False
        return open_date <= close_date

    @staticmethod
    def is_outlier_gmp(gmp_amount: Decimal, issue_price: Decimal | None) -> bool:
        if issue_price is None or issue_price <= 0:
            return False
        percentage = (abs(gmp_amount) / issue_price) * Decimal("100")
        return percentage > Decimal("200")  # Flag if GMP exceeds 200% of issue price
