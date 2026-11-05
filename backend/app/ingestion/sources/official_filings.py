"""Official SEBI/Exchange filings provider — architectural stub."""

import logging
from typing import Any

from app.ingestion.base import BaseDataProvider

logger = logging.getLogger(__name__)


class OfficialFilingsProvider(BaseDataProvider):
    """
    Provider for official IPO documents (DRHP, RHP, prospectus).
    Source: SEBI EDGAR or exchange filings.
    Implementation pending regulatory data access verification.
    """

    source_name = "official_filings"

    async def fetch_ipo_list(self) -> list[dict[str, Any]]:
        logger.warning("Official filings provider not yet implemented")
        return []

    async def fetch_ipo_detail(self, identifier: str) -> dict[str, Any] | None:
        logger.warning("Official filings provider not yet implemented")
        return None

    async def health_check(self) -> bool:
        return False
