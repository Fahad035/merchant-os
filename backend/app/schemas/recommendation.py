from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel


class RecommendationResponse(BaseModel):
    id: UUID
    action_id: str
    title: str
    explanation: str
    action_type: str
    expected_revenue: Decimal
    confidence: int
    risk_level: str
    requires_approval: bool
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class RecommendationActionRequest(BaseModel):
    recommendation_id: UUID