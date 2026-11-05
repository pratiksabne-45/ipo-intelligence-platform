"""IPO Pydantic schemas."""

from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict

from app.models.ipo import IPOStatus, IPOType


class IPOBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    slug: str
    company_name: str
    ipo_type: IPOType = IPOType.MAINBOARD
    status: IPOStatus = IPOStatus.UPCOMING
    price_band_min: Decimal | None = None
    price_band_max: Decimal | None = None
    issue_price: Decimal | None = None
    lot_size: int | None = None
    issue_size_cr: Decimal | None = None
    open_date: date | None = None
    close_date: date | None = None
    allotment_date: date | None = None
    listing_date: date | None = None
    exchange: str | None = None
    registrar: str | None = None


class IPORead(IPOBase):
    id: int
    created_at: datetime
    updated_at: datetime


class IPOListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    company_name: str
    ipo_type: IPOType
    status: IPOStatus
    price_band_min: Decimal | None = None
    price_band_max: Decimal | None = None
    open_date: date | None = None
    close_date: date | None = None
    listing_date: date | None = None
