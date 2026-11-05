"""Background task scheduler — architectural stub for milestone 2."""

import logging
from collections.abc import Callable

logger = logging.getLogger(__name__)


class DataIngestionScheduler:
    """
    Scheduler for periodic data collection jobs.
    Will integrate with APScheduler or Celery in milestone 2.
    """

    def __init__(self):
        self._jobs: list[dict] = []

    def register_job(self, name: str, cron: str, func: Callable) -> None:
        self._jobs.append({"name": name, "cron": cron, "func": func})
        logger.info("Registered job: %s (cron: %s)", name, cron)

    async def start(self) -> None:
        logger.info("Scheduler not yet active — pending milestone 2 implementation")

    async def stop(self) -> None:
        pass
