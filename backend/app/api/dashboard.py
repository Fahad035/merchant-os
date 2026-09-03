from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_merchant
from app.models.merchant import Merchant
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)

@router.get("", response_model=DashboardResponse)
def get_dashboard(
    current_merchant: Merchant = Depends(get_current_merchant),
    db: Session = Depends(get_db),
):
    service = DashboardService(db)

    return service.get_dashboard(
        current_merchant.id,
    )