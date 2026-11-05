"""Background job: fetch IPO data — architectural stub for Milestone 2."""

import logging

logger = logging.getLogger(__name__)


async def fetch_ipo_data_job() -> None:
    """Scheduled job to fetch IPO master data from configured providers."""
    logger.info("fetch_ipo_data_job: scheduled check (stub for Milestone 2)")
