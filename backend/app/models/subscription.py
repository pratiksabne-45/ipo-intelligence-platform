"""Subscription data model."""

from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class SubscriptionHistory(Base):
    __tablename__ = "subscription_history"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    ipo_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("ipos.id", ondelete="CASCADE"), nullable=False, index=True
    )

    # Subscription day
    subscription_date: Mapped[date] = mapped_column(Date, nullable=False)

    # Category subscriptions (times)
    qib_times: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 4), comment="QIB subscription times"
    )
    nii_times: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 4), comment="NII/HNI subscription times"
    )
    rii_times: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 4), comment="Retail Individual Investor times"
    )
    employee_times: Mapped[Decimal | None] = mapped_column(Numeric(12, 4))
    total_times: Mapped[Decimal | None] = mapped_column(Numeric(12, 4))

    # Shares applied
    shares_applied: Mapped[int | None] = mapped_column(Integer)
    shares_offered: Mapped[int | None] = mapped_column(Integer)

    # Provenance
    source_name: Mapped[str] = mapped_column(String(255), nullable=False)
    collection_timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    def __repr__(self) -> str:
        return f"<SubscriptionHistory id={self.id} ipo_id={self.ipo_id} date={self.subscription_date}>"
