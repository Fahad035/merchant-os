from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict


class CheckoutOrderResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: UUID

    merchant_id: UUID

    customer_name: str

    total_amount: float

    payment_status: str

    status: str


class CheckoutSummaryResponse(BaseModel):
    total_orders: int

    completed_orders: int

    pending_orders: int

    total_revenue: float

    ai_expected_revenue: float


class CheckoutDashboardResponse(BaseModel):
    summary: CheckoutSummaryResponse

    orders: list[CheckoutOrderResponse]