"""GMP endpoints."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session
from app.models.gmp import GMPHistory
from app.schemas.gmp import GMPHistoryRead

router = APIRouter(tags=["gmp"])


@router.get("/gmp/{ipo_id}/history", response_model=list[GMPHistoryRead])
async def get_gmp_history(
    ipo_id: int,
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_session),
):
    """
    Return GMP history for an IPO.
    Each record is an individual observation — historical data is never overwritten.
    """
    stmt = (
        select(GMPHistory)
        .where(GMPHistory.ipo_id == ipo_id)
        .order_by(GMPHistory.observation_timestamp.desc())
        .limit(limit)
    )
    result = await db.execute(stmt)
    return result.scalars().all()
