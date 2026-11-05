"""Background job: fetch GMP data — architectural stub for Milestone 2."""

import logging

logger = logging.getLogger(__name__)


async def fetch_gmp_data_job() -> None:
    """Scheduled job to collect GMP observations from verified sources."""
    logger.info("fetch_gmp_data_job: scheduled check (stub for Milestone 2)")
