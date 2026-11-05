"""Abstract base class for all external data providers."""

import logging
from abc import ABC, abstractmethod
from typing import Any

logger = logging.getLogger(__name__)


class BaseDataProvider(ABC):
    """
    Abstract interface for all external IPO data sources.

    Implementations must provide concrete adapters for:
    - NSE
    - BSE
    - Official filings
    - GMP providers

    Data providers must NOT be assumed stable. Each adapter should
    handle rate limiting, timeouts and schema changes independently.
    """

    source_name: str = "unknown"

    @abstractmethod
    async def fetch_ipo_list(self) -> list[dict[str, Any]]:
        """Fetch a list of IPO records from the source."""
        ...

    @abstractmethod
    async def fetch_ipo_detail(self, identifier: str) -> dict[str, Any] | None:
        """Fetch detailed data for a specific IPO."""
        ...

    @abstractmethod
    async def health_check(self) -> bool:
        """Return True if the data source is reachable."""
        ...

    def get_source_name(self) -> str:
        return self.source_name
