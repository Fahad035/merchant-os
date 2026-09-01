from sqlalchemy.orm import Session

from app.repositories.order_repository import OrderRepository


class CheckoutService:

    def __init__(self, db: Session):
        self.repository = OrderRepository(db)

    def dashboard(self, merchant_id):
        orders = self.repository.get_by_merchant(merchant_id)

        completed = [
            o for o in orders
            if o.status.lower() == "paid"
        ]

        pending = [
            o for o in orders
            if o.status.lower() == "pending"
        ]

        total_revenue = sum(
            float(o.total_amount)
            for o in completed
        )

        return {
            "summary": {
                "total_orders": len(orders),
                "completed_orders": len(completed),
                "pending_orders": len(pending),
                "total_revenue": total_revenue,
                "ai_expected_revenue": 12000,
            },
            "orders": [
                {
                    "id": str(o.id),
                    "order_number": o.order_number,
                    "customer_name": o.customer.full_name,
                    "status": o.status,
                    "amount": float(o.total_amount),
                }
                for o in orders
            ],
        }