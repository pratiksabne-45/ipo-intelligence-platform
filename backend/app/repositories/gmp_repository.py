"""GMP data access repository."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.gmp import GMPHistory


class GMPRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_history(self, ipo_id: int, limit: int = 50) -> list[GMPHistory]:
        stmt = (
            select(GMPHistory)
            .where(GMPHistory.ipo_id == ipo_id)
            .order_by(GMPHistory.observation_timestamp.desc())
            .limit(limit)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def add_observation(self, observation: GMPHistory) -> GMPHistory:
        """Add a new GMP observation — never updates existing records."""
        self.db.add(observation)
        await self.db.commit()
        await self.db.refresh(observation)
        return observation

    async def get_latest(self, ipo_id: int) -> GMPHistory | None:
        stmt = (
            select(GMPHistory)
            .where(GMPHistory.ipo_id == ipo_id, GMPHistory.is_outlier.is_(False))
            .order_by(GMPHistory.observation_timestamp.desc())
            .limit(1)
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
