"""GMP ingestion pipeline — architectural stub for milestone 2."""

import logging
from typing import Any

from app.ingestion.parsers.gmp_parser import GMPParser

logger = logging.getLogger(__name__)


class GMPIngestionPipeline:
    """
    Pipeline for collecting and storing GMP observations.
    Each observation is inserted as a new row — existing rows are NEVER updated.
    """

    def __init__(self):
        self.parser = GMPParser()

    def process(self, raw_records: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Parse and validate a batch of raw GMP observations."""
        processed = []
        for raw in raw_records:
            parsed = self.parser.parse(raw)
            if parsed is not None:
                processed.append(parsed)
        logger.info(
            "GMP pipeline processed %d/%d records", len(processed), len(raw_records)
        )
        return processed
