"""Financial calculation service."""

from decimal import Decimal


class CalculationService:
    @staticmethod
    def calculate_gmp_percentage(
        gmp_amount: Decimal, issue_price: Decimal | None
    ) -> Decimal | None:
        if not issue_price or issue_price <= 0:
            return None
        return (gmp_amount / issue_price * Decimal("100")).quantize(Decimal("0.01"))

    @staticmethod
    def calculate_estimated_listing(
        issue_price: Decimal | None, gmp_amount: Decimal
    ) -> Decimal | None:
        """
        Estimated listing price = issue_price + gmp_amount.
        This is UNOFFICIAL and must be clearly labeled as such.
        """
        if issue_price is None:
            return None
        return issue_price + gmp_amount

    @staticmethod
    def calculate_subscription_times(
        shares_applied: int, shares_offered: int
    ) -> Decimal | None:
        if not shares_offered or shares_offered <= 0:
            return None
        return (Decimal(shares_applied) / Decimal(shares_offered)).quantize(
            Decimal("0.0001")
        )
