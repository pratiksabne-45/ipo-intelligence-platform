"""GMP History SQLAlchemy model — each observation is a separate record."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class GMPHistory(Base):
    __tablename__ = "gmp_history"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    ipo_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("ipos.id", ondelete="CASCADE"), nullable=False, index=True
    )

    # GMP value — NEVER overwrite; each row is one observation
    gmp_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False, comment="Grey Market Premium in INR"
    )
    estimated_listing_price: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 2),
        comment="Computed: issue_price + gmp_amount; unofficial estimate only",
    )
    gmp_percentage: Mapped[Decimal | None] = mapped_column(
        Numeric(8, 4), comment="gmp_amount / issue_price * 100"
    )

    # Provenance
    source_name: Mapped[str] = mapped_column(
        String(255), nullable=False, comment="Data provider identifier"
    )
    source_reference: Mapped[str | None] = mapped_column(
        Text, comment="URL or identifier from the original source"
    )
    raw_value: Mapped[str | None] = mapped_column(
        Text, comment="Original raw string before normalization"
    )

    # Timing
    observation_timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        comment="When the GMP was reportedly observed (UTC)",
    )
    collection_timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        comment="When our system collected this record (UTC)",
    )

    # Data quality flags
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_stale: Mapped[bool] = mapped_column(Boolean, default=False)
    is_outlier: Mapped[bool] = mapped_column(Boolean, default=False)

    def __repr__(self) -> str:
        return f"<GMPHistory id={self.id} ipo_id={self.ipo_id} gmp={self.gmp_amount}>"
