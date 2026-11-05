"""Subscription ingestion pipeline — architectural stub for milestone 2."""

import logging
from typing import Any

logger = logging.getLogger(__name__)


class SubscriptionIngestionPipeline:
    """Pipeline for ingesting subscription data snapshots."""

    def process(self, raw_records: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Process raw subscription records."""
        logger.info("Subscription pipeline received %d records", len(raw_records))
        # Full implementation in milestone 2
        return raw_records
