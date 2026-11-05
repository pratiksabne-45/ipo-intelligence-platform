"""Subscription endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session
from app.models.subscription import SubscriptionHistory
from app.schemas.subscription import SubscriptionRead

router = APIRouter(tags=["subscriptions"])


@router.get("/subscriptions/{ipo_id}", response_model=list[SubscriptionRead])
async def get_subscription_history(
    ipo_id: int,
    db: AsyncSession = Depends(get_session),
):
    """Return subscription data history for an IPO."""
    stmt = (
        select(SubscriptionHistory)
        .where(SubscriptionHistory.ipo_id == ipo_id)
        .order_by(SubscriptionHistory.subscription_date.desc())
    )
    result = await db.execute(stmt)
    return result.scalars().all()
