"""IPO data access repository."""

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.ipo import IPO, IPOStatus


class IPORepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(
        self,
        status: IPOStatus | None = None,
        page: int = 1,
        page_size: int = 20,
    ) -> list[IPO]:
        stmt = select(IPO)
        if status:
            stmt = stmt.where(IPO.status == status)
        stmt = (
            stmt.offset((page - 1) * page_size)
            .limit(page_size)
            .order_by(IPO.open_date.desc().nullslast())
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_slug(self, slug: str) -> IPO | None:
        result = await self.db.execute(select(IPO).where(IPO.slug == slug))
        return result.scalar_one_or_none()

    async def get_by_id(self, ipo_id: int) -> IPO | None:
        result = await self.db.execute(select(IPO).where(IPO.id == ipo_id))
        return result.scalar_one_or_none()

    async def count(self, status: IPOStatus | None = None) -> int:
        stmt = select(func.count(IPO.id))
        if status:
            stmt = stmt.where(IPO.status == status)
        result = await self.db.execute(stmt)
        return result.scalar_one()

    async def create(self, ipo: IPO) -> IPO:
        self.db.add(ipo)
        await self.db.commit()
        await self.db.refresh(ipo)
        return ipo
