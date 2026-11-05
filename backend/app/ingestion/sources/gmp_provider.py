"""GMP data provider — architectural stub."""

import logging
from typing import Any

from app.ingestion.base import BaseDataProvider

logger = logging.getLogger(__name__)


class GMPDataProvider(BaseDataProvider):
    """
    Grey Market Premium data provider.

    IMPORTANT: GMP is unofficial market information. There is no official
    exchange API for GMP data. Sources must be identified, verified for
    legal permissibility, and evaluated for reliability before connecting.

    This is an architectural placeholder only.

    GMP data must clearly be marked as unofficial and must not be presented
    as a guaranteed listing outcome.
    """

    source_name = "gmp_provider"

    async def fetch_ipo_list(self) -> list[dict[str, Any]]:
        logger.warning(
            "GMP provider not yet implemented — awaiting source verification"
        )
        return []

    async def fetch_ipo_detail(self, identifier: str) -> dict[str, Any] | None:
        return None

    async def fetch_gmp_observations(self, ipo_identifier: str) -> list[dict[str, Any]]:
        """Fetch GMP observations for a specific IPO."""
        logger.warning("GMP provider not yet implemented")
        return []

    async def health_check(self) -> bool:
        return False
