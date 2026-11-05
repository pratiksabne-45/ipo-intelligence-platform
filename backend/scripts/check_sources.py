"""
Data source connectivity check.
Usage: python scripts/check_sources.py
"""

import asyncio
import logging
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.core.logging import configure_logging
from app.ingestion.sources.bse import BSEDataProvider
from app.ingestion.sources.gmp_provider import GMPDataProvider
from app.ingestion.sources.nse import NSEDataProvider

configure_logging()
logger = logging.getLogger(__name__)


async def check_all_sources() -> None:
    providers = [NSEDataProvider(), BSEDataProvider(), GMPDataProvider()]
    for provider in providers:
        status = await provider.health_check()
        logger.info(
            "Source '%s': %s",
            provider.source_name,
            "reachable" if status else "not implemented / offline (stub)",
        )


if __name__ == "__main__":
    asyncio.run(check_all_sources())
