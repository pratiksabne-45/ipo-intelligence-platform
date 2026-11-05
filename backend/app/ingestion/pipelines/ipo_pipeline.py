"""IPO data ingestion pipeline — architectural stub for milestone 2."""

import logging
from typing import Any

from app.ingestion.cleaners.normalization import normalize_ipo_record
from app.ingestion.cleaners.validation import validate_ipo_record
from app.ingestion.parsers.ipo_parser import IPOParser

logger = logging.getLogger(__name__)


class IPOIngestionPipeline:
    """
    End-to-end pipeline: fetch → parse → normalize → validate → persist.
    Full persistence integration will be completed in milestone 2.
    """

    def __init__(self):
        self.parser = IPOParser()

    def process(self, raw_records: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Process a batch of raw IPO records through the pipeline."""
        processed = []
        for raw in raw_records:
            parsed = self.parser.parse(raw)
            normalized = normalize_ipo_record(parsed)
            errors = validate_ipo_record(normalized)
            if errors:
                logger.warning("Validation errors for record %r: %s", raw, errors)
                continue
            processed.append(normalized)
        logger.info(
            "Pipeline processed %d/%d records", len(processed), len(raw_records)
        )
        return processed
