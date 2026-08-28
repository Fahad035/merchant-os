from decimal import Decimal
from uuid import uuid4

from app.models.ai_recommendation import AIRecommendation
from app.services.recommendation_engine import RecommendationEngine


class PricingRecommendationEngine(RecommendationEngine):
    """
    AI Pricing Engine

    Generates recommendations for:

    - Price Increase
    - Discount
    - Clearance
    """

    LOW_STOCK = 10
    OVER_STOCK = 300

    def generate(self, merchant_id):

        products = self.load_products(merchant_id)

        recommendations = []

        for product in products:

            stock = product.stock_quantity
            price = Decimal(str(product.price))

            # ---------------------------------
            # High demand
            # ---------------------------------

            if stock <= self.LOW_STOCK:

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"PRICE-{uuid4().hex[:8].upper()}",

                        title=f"Increase price of {product.name}",

                        explanation=(
                            f"{product.name} has very low inventory. "
                            f"Consider increasing its selling price."
                        ),

                        action_type="pricing",

                        expected_revenue=price * Decimal("0.15"),

                        confidence=92,

                        risk_level="medium",

                        requires_approval=True,

                        status="pending",

                    )

                )

            # ---------------------------------
            # Overstock
            # ---------------------------------

            elif stock >= self.OVER_STOCK:

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"PRICE-{uuid4().hex[:8].upper()}",

                        title=f"Discount {product.name}",

                        explanation=(
                            f"{product.name} has excess inventory. "
                            f"Running a discount campaign may improve sales."
                        ),

                        action_type="pricing",

                        expected_revenue=price * Decimal("0.08"),

                        confidence=88,

                        risk_level="low",

                        requires_approval=True,

                        status="pending",

                    )

                )

            # ---------------------------------
            # Premium products
            # ---------------------------------

            elif price >= Decimal("1000"):

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"PRICE-{uuid4().hex[:8].upper()}",

                        title=f"Premium pricing review for {product.name}",

                        explanation=(
                            f"{product.name} is a premium product. "
                            f"Review pricing to maximize margin."
                        ),

                        action_type="pricing",

                        expected_revenue=price * Decimal("0.05"),

                        confidence=80,

                        risk_level="low",

                        requires_approval=True,

                        status="pending",

                    )

                )

        return recommendations