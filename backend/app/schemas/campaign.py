from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict


class CampaignResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: UUID

    merchant_id: UUID

    title: str

    description: str

    audience: str

    discount_percentage: int

    expected_revenue: float

    confidence: int

    status: str

    requires_approval: bool


class CampaignListResponse(BaseModel):
    campaigns: list[CampaignResponse]

    total: int