from pydantic import BaseModel
from typing import Literal


class RevenuePoint(BaseModel):
    day: str
    sales: float


class RecentOrder(BaseModel):
    id: str
    customer: str
    amount: float
    status: str


class AIRecommendation(BaseModel):
    action_id: str

    title: str

    explanation: str

    expected_revenue: float

    confidence: int

    risk_level: Literal[
        "Low",
        "Medium",
        "High",
    ]

    requires_approval: bool

    action_type: Literal[
        "campaign",
        "bundle",
        "upsell",
        "discount",
    ]


class DashboardResponse(BaseModel):
    revenue: float

    orders: int

    conversion_rate: float

    opportunities: int

    chart: list[RevenuePoint]

    recent_orders: list[RecentOrder]

    insights: list[str]