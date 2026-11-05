"""IPO business logic service."""

import logging

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.ipo import IPO, IPOStatus
from app.repositories.ipo_repository import IPORepository
from app.utils.slug_utils import slugify

logger = logging.getLogger(__name__)


class IPOService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = IPORepository(db)

    async def get_by_slug(self, slug: str) -> IPO | None:
        return await self.repo.get_by_slug(slug)

    async def list_ipos(
        self,
        status: IPOStatus | None = None,
        page: int = 1,
        page_size: int = 20,
    ) -> list[IPO]:
        return await self.repo.get_all(status=status, page=page, page_size=page_size)

    async def generate_unique_slug(self, company_name: str) -> str:
        base_slug = slugify(company_name)
        slug = base_slug
        counter = 1
        while True:
            existing = await self.get_by_slug(slug)
            if not existing:
                return slug
            slug = f"{base_slug}-{counter}"
            counter += 1
