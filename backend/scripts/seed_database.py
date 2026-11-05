"""
Database seeder script.
Run after migrations to optionally populate dev/test data.
Usage: python scripts/seed_database.py
"""

import asyncio
import logging
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.core.logging import configure_logging
from app.database.session import AsyncSessionLocal

configure_logging()
logger = logging.getLogger(__name__)


async def seed() -> None:
    logger.info("Seed script starting — no fake seed data defined for milestone 1")
    logger.info("Add verified IPO data here once a live data source is confirmed")
    async with AsyncSessionLocal():
        logger.info("Database session opened successfully")


if __name__ == "__main__":
    asyncio.run(seed())
