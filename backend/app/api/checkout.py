from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.checkout import (
    CheckoutDashboardResponse,
    CheckoutOrderResponse,
)

from app.services.checkout_service import (
    CheckoutService,
)

router = APIRouter(
    prefix="/checkout",
    tags=["Checkout"],
)


@router.get(
    "",
    response_model=CheckoutDashboardResponse,
)
def dashboard(
    db: Session = Depends(get_db),
):
    service = CheckoutService(db)

    return service.dashboard()


@router.get(
    "/recent",
    response_model=list[CheckoutOrderResponse],
)
def recent_orders(
    db: Session = Depends(get_db),
):
    service = CheckoutService(db)

    return service.recent_orders()