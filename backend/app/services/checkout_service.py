from sqlalchemy.orm import Session

from app.repositories.order_repository import (
    OrderRepository,
)


class CheckoutService:

    def __init__(self, db: Session):
        self.repository = OrderRepository(db)

    def dashboard(self):
        orders = self.repository.get_all()

        total_orders = len(orders)

        completed = [
            o
            for o in orders
            if o.status.lower() == "completed"
        ]

        pending = [
            o
            for o in orders
            if o.status.lower() == "pending"
        ]

        total_revenue = sum(
            float(o.total_amount)
            for o in completed
        )

        return {
            "summary": {
                "total_orders": total_orders,
                "completed_orders": len(
                    completed
                ),
                "pending_orders": len(
                    pending
                ),
                "total_revenue": total_revenue,
                "ai_expected_revenue": 12000,
            },
            "orders": orders,
        }

    def recent_orders(self):
        return self.repository.get_all()[:10]