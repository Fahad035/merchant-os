from datetime import datetime
from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict


class AuditLogResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: UUID

    merchant_id: UUID

    action: str

    reasoning: str

    status: str

    created_at: datetime


class AuditSummaryResponse(BaseModel):
    total: int

    approved: int

    rejected: int

    executed: int


class AuditDashboardResponse(BaseModel):
    summary: AuditSummaryResponse

    logs: list[AuditLogResponse]