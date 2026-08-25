from app.schemas.dashboard import (
    AIRecommendation,
    DashboardResponse,
    RecentOrder,
    RevenuePoint,
)


class DashboardService:
    @staticmethod
    def get_dashboard() -> DashboardResponse:
        return DashboardResponse(
            revenue=824500,
            orders=321,
            conversion_rate=4.8,
            opportunities=5,
            chart=[
                RevenuePoint(day="Mon", sales=42000),
                RevenuePoint(day="Tue", sales=51000),
                RevenuePoint(day="Wed", sales=68000),
                RevenuePoint(day="Thu", sales=73000),
                RevenuePoint(day="Fri", sales=92000),
                RevenuePoint(day="Sat", sales=120000),
                RevenuePoint(day="Sun", sales=98000),
            ],
            recent_orders=[
                RecentOrder(
                    id="ORD-1001",
                    customer="Rahul Sharma",
                    amount=2499,
                    status="Paid",
                ),
                RecentOrder(
                    id="ORD-1002",
                    customer="Priya Singh",
                    amount=1299,
                    status="Pending",
                ),
                RecentOrder(
                    id="ORD-1003",
                    customer="Amit Kumar",
                    amount=3499,
                    status="Paid",
                ),
                RecentOrder(
                    id="ORD-1004",
                    customer="Sneha Patel",
                    amount=999,
                    status="Refunded",
                ),
            ],
            insights=[
                AIRecommendation(
                    action_id="ACT-001",
                    title="Bundle Opportunity",
                    explanation="Customers buying Running Shoes frequently purchase Sports Socks within the same shopping session.",
                    expected_revenue=18000,
                    confidence=92,
                    risk_level="Low",
                    requires_approval=True,
                    action_type="bundle",
                ),
                AIRecommendation(
                    action_id="ACT-002",
                    title="Checkout Upsell",
                    explanation="Offer Shoe Care Kit during checkout to customers purchasing premium footwear.",
                    expected_revenue=9000,
                    confidence=86,
                    risk_level="Low",
                    requires_approval=True,
                    action_type="upsell",
                ),
                AIRecommendation(
                    action_id="ACT-003",
                    title="Weekend Campaign",
                    explanation="Launch a 10% campaign for inactive customers who haven't purchased in the last 45 days.",
                    expected_revenue=32000,
                    confidence=89,
                    risk_level="Medium",
                    requires_approval=True,
                    action_type="campaign",
                ),
            ],
        )