"""IPO endpoints."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session
from app.core.exceptions import NotFoundError
from app.models.ipo import IPO, IPOStatus
from app.schemas.ipo import IPOListItem, IPORead

router = APIRouter(tags=["ipos"])


@router.get("/ipos", response_model=list[IPOListItem])
async def list_ipos(
    status: IPOStatus | None = Query(None),
    ipo_type: str | None = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_session),
):
    """List IPOs with optional status filtering and pagination."""
    stmt = select(IPO)
    if status:
        stmt = stmt.where(IPO.status == status)
    stmt = (
        stmt.offset((page - 1) * page_size)
        .limit(page_size)
        .order_by(IPO.open_date.desc().nullslast())
    )
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/ipos/{slug}", response_model=IPORead)
async def get_ipo(slug: str, db: AsyncSession = Depends(get_session)):
    """Get a single IPO by slug."""
    result = await db.execute(select(IPO).where(IPO.slug == slug))
    ipo = result.scalar_one_or_none()
    if not ipo:
        raise NotFoundError(f"IPO '{slug}'")
    return ipo
