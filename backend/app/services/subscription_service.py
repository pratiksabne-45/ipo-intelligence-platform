"""Subscription business logic service."""

import logging

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.subscription import SubscriptionHistory
from app.repositories.subscription_repository import SubscriptionRepository

logger = logging.getLogger(__name__)


class SubscriptionService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = SubscriptionRepository(db)

    async def get_subscription_history(self, ipo_id: int) -> list[SubscriptionHistory]:
        return await self.repo.get_history(ipo_id)
