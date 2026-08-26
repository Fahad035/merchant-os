from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.audit import (
    AuditDashboardResponse,
    AuditLogResponse,
)

from app.services.audit_service import (
    AuditService,
)

router = APIRouter(
    prefix="/audit",
    tags=["Audit"],
)


@router.get(
    "",
    response_model=AuditDashboardResponse,
)
def dashboard(
    db: Session = Depends(get_db),
):
    return AuditService(db).dashboard()


@router.get(
    "/history",
    response_model=list[AuditLogResponse],
)
def history(
    db: Session = Depends(get_db),
):
    return AuditService(db).history()


@router.get(
    "/{audit_id}",
    response_model=AuditLogResponse,
)
def details(
    audit_id: UUID,
    db: Session = Depends(get_db),
):
    audit = AuditService(db).get(audit_id)

    if audit is None:
        raise HTTPException(
            status_code=404,
            detail="Audit log not found",
        )

    return audit