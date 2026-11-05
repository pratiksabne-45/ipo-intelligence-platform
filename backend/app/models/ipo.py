"""IPO SQLAlchemy model."""

from __future__ import annotations

import enum
from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Boolean, Date, DateTime, Integer, Numeric, String, Text, func
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class IPOType(enum.StrEnum):
    MAINBOARD = "mainboard"
    SME = "sme"


class IPOStatus(enum.StrEnum):
    UPCOMING = "upcoming"
    OPEN = "open"
    CLOSED = "closed"
    LISTED = "listed"
    WITHDRAWN = "withdrawn"


class IPO(Base):
    __tablename__ = "ipos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    slug: Mapped[str] = mapped_column(
        String(255), unique=True, nullable=False, index=True
    )
    company_name: Mapped[str] = mapped_column(String(500), nullable=False)
    company_name_normalized: Mapped[str] = mapped_column(
        String(500), nullable=False, index=True
    )
    ipo_type: Mapped[IPOType] = mapped_column(
        SAEnum(IPOType), nullable=False, default=IPOType.MAINBOARD
    )
    status: Mapped[IPOStatus] = mapped_column(
        SAEnum(IPOStatus), nullable=False, default=IPOStatus.UPCOMING
    )

    # Price information
    price_band_min: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    price_band_max: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    issue_price: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    lot_size: Mapped[int | None] = mapped_column(Integer)

    # Issue details
    issue_size_cr: Mapped[Decimal | None] = mapped_column(
        Numeric(14, 2), comment="Issue size in crores INR"
    )
    fresh_issue_cr: Mapped[Decimal | None] = mapped_column(Numeric(14, 2))
    ofs_cr: Mapped[Decimal | None] = mapped_column(
        Numeric(14, 2), comment="Offer for Sale in crores INR"
    )

    # Key dates (store as date in UTC context, display in IST)
    open_date: Mapped[date | None] = mapped_column(Date)
    close_date: Mapped[date | None] = mapped_column(Date)
    allotment_date: Mapped[date | None] = mapped_column(Date)
    refund_date: Mapped[date | None] = mapped_column(Date)
    listing_date: Mapped[date | None] = mapped_column(Date)

    # Exchange listing
    exchange: Mapped[str | None] = mapped_column(
        String(20), comment="NSE, BSE, NSE+BSE"
    )
    registrar: Mapped[str | None] = mapped_column(String(255))

    # Source references
    nse_symbol: Mapped[str | None] = mapped_column(String(50))
    bse_code: Mapped[str | None] = mapped_column(String(20))
    sebi_filing_url: Mapped[str | None] = mapped_column(Text)
    prospectus_url: Mapped[str | None] = mapped_column(Text)

    # Data quality
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    data_source_id: Mapped[int | None] = mapped_column(Integer)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"<IPO id={self.id} slug={self.slug!r} company={self.company_name!r}>"
