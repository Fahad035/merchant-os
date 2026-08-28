from decimal import Decimal
from uuid import uuid4

from app.models.ai_recommendation import AIRecommendation
from app.services.recommendation_engine import RecommendationEngine


class InventoryRecommendationEngine(RecommendationEngine):
    """
    Inventory Intelligence Engine

    Generates:

    - Low Stock
    - Out of Stock
    - Overstock
    """

    LOW_STOCK = 10
    OVER_STOCK = 300

    def generate(self, merchant_id):

        products = self.load_products(merchant_id)

        recommendations = []

        for product in products:

            stock = product.stock_quantity

            # -----------------------------
            # Out Of Stock
            # -----------------------------

            if stock == 0:

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"INV-{uuid4().hex[:8].upper()}",

                        title=f"Restock {product.name}",

                        explanation=(
                            f"{product.name} is out of stock."
                        ),

                        action_type="inventory",

                        expected_revenue=Decimal(str(product.price * 20)),

                        confidence=98,

                        risk_level="high",

                        requires_approval=True,

                        status="pending",

                    )

                )

                continue

            # -----------------------------
            # Low Stock
            # -----------------------------

            if stock <= self.LOW_STOCK:

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"INV-{uuid4().hex[:8].upper()}",

                        title=f"Low stock: {product.name}",

                        explanation=(
                            f"Only {stock} units remaining."
                        ),

                        action_type="inventory",

                        expected_revenue=Decimal(str(product.price * 10)),

                        confidence=90,

                        risk_level="medium",

                        requires_approval=True,

                        status="pending",

                    )

                )

            # -----------------------------
            # Overstock
            # -----------------------------

            elif stock >= self.OVER_STOCK:

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"INV-{uuid4().hex[:8].upper()}",

                        title=f"Overstock: {product.name}",

                        explanation=(
                            f"{product.name} has {stock} units in stock."
                        ),

                        action_type="inventory",

                        expected_revenue=Decimal(str(product.price * 5)),

                        confidence=82,

                        risk_level="low",

                        requires_approval=True,

                        status="pending",

                    )

                )

        return recommendations