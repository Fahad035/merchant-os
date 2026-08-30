from collections import defaultdict
from decimal import Decimal
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.order_repository import OrderRepository
from app.repositories.recommendation_repository import RecommendationRepository
from app.repositories.merchant_repository import MerchantRepository

from app.schemas.dashboard import (
    DashboardResponse,
    RevenuePoint,
    RecentOrder,
)


class DashboardService:
    def __init__(self, db: Session):
        self.db = db

        self.order_repo = OrderRepository(db)
        self.recommendation_repo = RecommendationRepository(db)
        self.merchant_repo = MerchantRepository(db)

    def get_dashboard(
        self,
        merchant_id: UUID,
    ) -> DashboardResponse:

        merchant = self.merchant_repo.get(merchant_id)

        if merchant is None:
            raise HTTPException(
                status_code=404,
                detail="Merchant not found",
            )

        orders = self.order_repo.get_by_merchant(
            merchant_id
        )

        recommendations = (
            self.recommendation_repo.get_by_merchant(
                merchant_id
            )
        )

        revenue = float(
            sum(
                Decimal(order.total_amount)
                for order in orders
            )
        )

        total_orders = len(orders)

        paid_orders = len(
            [
                order
                for order in orders
                if order.status.lower() == "paid"
            ]
        )

        conversion = (
            round(
                (paid_orders / total_orders) * 100,
                2,
            )
            if total_orders
            else 0
        )

        pending = [
            recommendation
            for recommendation in recommendations
            if recommendation.status.lower() == "pending"
        ]

        chart = self._weekly_chart(
            orders
        )

        recent_orders = sorted(
            orders,
            key=lambda order: order.created_at,
            reverse=True,
        )[:5]

        # ------------------------------------------
        # Rule-based dashboard insights (No Gemini)
        # ------------------------------------------

        insights = []

        if revenue > 100000:
            insights.append(
                "Revenue is performing strongly this month."
            )
        elif revenue > 0:
            insights.append(
                "Revenue is growing but has room for improvement."
            )
        else:
            insights.append(
                "No revenue has been generated yet."
            )

        if conversion >= 60:
            insights.append(
                "Excellent conversion rate indicates strong customer engagement."
            )
        elif conversion >= 30:
            insights.append(
                "Conversion rate is healthy but can be improved."
            )
        else:
            insights.append(
                "Conversion rate is low. Improve checkout and promotions."
            )

        if total_orders >= 100:
            insights.append(
                "High order volume shows consistent customer demand."
            )
        elif total_orders >= 20:
            insights.append(
                "Order volume is stable."
            )
        else:
            insights.append(
                "Increase marketing efforts to attract more customers."
            )

        if pending:
            insights.append(
                f"{len(pending)} AI recommendations are waiting for review."
            )
        else:
            insights.append(
                "No pending recommendations."
            )

        insights.append(
            "Launch a repeat-customer discount campaign to increase retention."
        )

        return DashboardResponse(
            revenue=revenue,
            orders=total_orders,
            conversion_rate=conversion,
            opportunities=len(pending),
            chart=chart,
            recent_orders=[
                RecentOrder(
                    id=order.order_number,
                    customer=order.customer.full_name,
                    amount=float(order.total_amount),
                    status=order.status.title(),
                )
                for order in recent_orders
            ],
            insights=insights,
        )

    def _weekly_chart(
        self,
        orders,
    ):

        totals = defaultdict(float)

        for order in orders:
            day = order.created_at.strftime("%a")

            totals[day] += float(
                order.total_amount
            )

        days = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
        ]

        return [
            RevenuePoint(
                day=day,
                sales=round(
                    totals.get(day, 0),
                    2,
                ),
            )
            for day in days
        ]