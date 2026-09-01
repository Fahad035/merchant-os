from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.database import get_db
from app.core.config import settings

from app.models.merchant import Merchant

from app.schemas.checkout import (
    CreateOrderRequest,
    CreateOrderResponse,
    VerifyPaymentRequest,
)

from app.services.checkout_service import CheckoutService
from app.services.razorpay_service import RazorpayService
from app.services.audit_service import AuditService

router = APIRouter(
    prefix="/checkout",
    tags=["Checkout"],
)


# ---------------- Dashboard ----------------

@router.get("")
def checkout_dashboard(
    merchant_id: UUID,
    db: Session = Depends(get_db),
):
    return CheckoutService(db).dashboard(merchant_id)


# ---------------- Recent Orders ----------------

@router.get("/recent")
def recent_orders(
    db: Session = Depends(get_db),
):
    merchant = db.query(Merchant).first()

    return CheckoutService(db).recent_orders(
        merchant.id,
    )

@router.get("/recommendation")
def checkout_recommendation(
    merchant_id: UUID,
    db: Session = Depends(get_db),
):
    return CheckoutService(db).checkout_recommendation(
        merchant_id
    )

# ---------------- Razorpay ----------------

@router.post(
    "/create-order",
    response_model=CreateOrderResponse,
)
def create_order(
    request: CreateOrderRequest,
):
    razorpay = RazorpayService()

    order = razorpay.create_order(
        int(request.amount * 100),
    )

    return CreateOrderResponse(
        order_id=order["id"],
        amount=order["amount"],
        currency=order["currency"],
        key=settings.RAZORPAY_KEY_ID,
    )


@router.post("/verify")
def verify(
    request: VerifyPaymentRequest,
    db: Session = Depends(get_db),
):
    RazorpayService().verify(
        request.razorpay_payment_id,
        request.razorpay_order_id,
        request.razorpay_signature,
    )

    merchant = db.query(Merchant).first()

    AuditService(db).create_log(
        merchant_id=merchant.id,
        recommendation_id=request.recommendation_id,
        event_type="Payment Success",
        actor="Merchant",
        details=f"Payment {request.razorpay_payment_id} verified.",
    )

    return {
        "success": True,
    }