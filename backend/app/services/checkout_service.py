from sqlalchemy.orm import Session

from app.repositories.order_repository import OrderRepository

from app.models.ai_recommendation import AIRecommendation

class CheckoutService:

    def __init__(self, db: Session):
        self.db = db
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

    def checkout_recommendation(self, merchant_id):
        recommendation = (
            self.db.query(AIRecommendation)
            .filter(
            AIRecommendation.merchant_id == merchant_id,
            AIRecommendation.status == "pending",
        )
        .order_by(AIRecommendation.created_at.desc())
        .first()
    )

        if recommendation is None:
            return {
            "id": "",
            "title": "No recommendation available",
            "explanation": "",
            "expected_revenue": 0,
            "confidence": 0,
        }

        return {
        "id": str(recommendation.id),
        "title": recommendation.title,
        "explanation": recommendation.explanation,
        "expected_revenue": float(recommendation.expected_revenue),
        "confidence": recommendation.confidence,
    }