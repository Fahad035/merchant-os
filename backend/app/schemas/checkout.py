from pydantic import BaseModel
from uuid import UUID


class CreateOrderRequest(BaseModel):

    merchant_id: UUID

    amount: float


class CreateOrderResponse(BaseModel):

    order_id: str

    amount: int

    currency: str

    key: str


class VerifyPaymentRequest(BaseModel):

    merchant_id: UUID

    recommendation_id: UUID | None = None

    razorpay_order_id: str

    razorpay_payment_id: str

    razorpay_signature: str