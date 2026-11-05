"""Background job: fetch subscription data — architectural stub for Milestone 2."""

import logging

logger = logging.getLogger(__name__)


async def fetch_subscription_data_job() -> None:
    """Scheduled job to collect subscription progress data during active bidding."""
    logger.info("fetch_subscription_data_job: scheduled check (stub for Milestone 2)")
