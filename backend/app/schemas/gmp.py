"""GMP Pydantic schemas."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class GMPHistoryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    ipo_id: int
    gmp_amount: Decimal
    estimated_listing_price: Decimal | None = None
    gmp_percentage: Decimal | None = None
    source_name: str
    observation_timestamp: datetime
    collection_timestamp: datetime
    is_verified: bool
    is_stale: bool
    is_outlier: bool


class GMPLatestResponse(BaseModel):
    ipo_id: int
    company_name: str
    slug: str
    latest_gmp: Decimal | None = None
    gmp_percentage: Decimal | None = None
    observation_timestamp: datetime | None = None
    source_name: str | None = None
    disclaimer: str = (
        "GMP is an unofficial grey market estimate and not a guaranteed listing price."
    )
