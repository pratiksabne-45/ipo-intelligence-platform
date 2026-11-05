"""Subscription Pydantic schemas."""

from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class SubscriptionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    ipo_id: int
    subscription_date: date
    qib_times: Decimal | None = None
    nii_times: Decimal | None = None
    rii_times: Decimal | None = None
    employee_times: Decimal | None = None
    total_times: Decimal | None = None
    source_name: str
    collection_timestamp: datetime
