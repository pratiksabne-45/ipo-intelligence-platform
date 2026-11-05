"""GMP business logic service."""

import logging

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.gmp import GMPHistory
from app.repositories.gmp_repository import GMPRepository

logger = logging.getLogger(__name__)


class GMPService:
    """
    Service for GMP data operations.
    GMP observations are NEVER overwritten — each is a new historical record.
    """

    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = GMPRepository(db)

    async def get_latest_gmp(self, ipo_id: int) -> GMPHistory | None:
        return await self.repo.get_latest(ipo_id)

    async def get_gmp_history(self, ipo_id: int, limit: int = 50) -> list[GMPHistory]:
        return await self.repo.get_history(ipo_id, limit=limit)
