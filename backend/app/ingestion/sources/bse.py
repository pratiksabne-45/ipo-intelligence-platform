"""BSE data provider adapter — architectural stub for milestone 2."""

import logging
from typing import Any

from app.ingestion.base import BaseDataProvider

logger = logging.getLogger(__name__)


class BSEDataProvider(BaseDataProvider):
    """
    Bombay Stock Exchange data adapter.

    NOTE: BSE API access and terms must be verified before implementation.
    This is an architectural stub.
    """

    source_name = "bse"

    async def fetch_ipo_list(self) -> list[dict[str, Any]]:
        logger.warning("BSE provider not yet implemented")
        return []

    async def fetch_ipo_detail(self, identifier: str) -> dict[str, Any] | None:
        logger.warning("BSE provider not yet implemented")
        return None

    async def health_check(self) -> bool:
        return False
