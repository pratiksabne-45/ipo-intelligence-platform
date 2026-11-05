"""NSE data provider adapter — architectural stub for milestone 2."""

import logging
from typing import Any

from app.ingestion.base import BaseDataProvider

logger = logging.getLogger(__name__)


class NSEDataProvider(BaseDataProvider):
    """
    National Stock Exchange data adapter.

    NOTE: NSE API endpoints must be verified for public use terms before
    implementing actual data collection. This is an architectural stub.
    """

    source_name = "nse"

    async def fetch_ipo_list(self) -> list[dict[str, Any]]:
        logger.warning("NSE provider not yet implemented")
        return []

    async def fetch_ipo_detail(self, identifier: str) -> dict[str, Any] | None:
        logger.warning("NSE provider not yet implemented")
        return None

    async def health_check(self) -> bool:
        return False
