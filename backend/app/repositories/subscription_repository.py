"""Subscription data access repository."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.subscription import SubscriptionHistory


class SubscriptionRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_history(self, ipo_id: int) -> list[SubscriptionHistory]:
        stmt = (
            select(SubscriptionHistory)
            .where(SubscriptionHistory.ipo_id == ipo_id)
            .order_by(SubscriptionHistory.subscription_date.desc())
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def add_history(self, record: SubscriptionHistory) -> SubscriptionHistory:
        self.db.add(record)
        await self.db.commit()
        await self.db.refresh(record)
        return record
