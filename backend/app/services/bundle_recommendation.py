from decimal import Decimal
from uuid import uuid4

from app.models.ai_recommendation import AIRecommendation
from app.services.recommendation_engine import RecommendationEngine


class BundleRecommendationEngine(RecommendationEngine):
    """
    Generates bundle recommendations using
    merchant catalog data.
    """

    def generate(self, merchant_id):

        products = self.load_products(merchant_id)

        if len(products) < 2:
            return []

        recommendations = []

        # Compare every pair of products
        for i in range(len(products)):
            for j in range(i + 1, len(products)):

                first = products[i]
                second = products[j]

                # Same category
                if first.category != second.category:
                    continue

                # Ignore out of stock
                if first.stock_quantity <= 0:
                    continue

                if second.stock_quantity <= 0:
                    continue

                revenue = (
                    Decimal(first.price)
                    + Decimal(second.price)
                ) * Decimal("0.15")

                recommendation = AIRecommendation(
                    merchant_id=merchant_id,
                    action_id=f"BUNDLE-{uuid4().hex[:8].upper()}",
                    title=f"Bundle {first.name} + {second.name}",
                    explanation=(
                        f"Bundle '{first.name}' with "
                        f"'{second.name}' to increase "
                        "average order value."
                    ),
                    action_type="bundle",
                    expected_revenue=revenue,
                    confidence=85,
                    risk_level="low",
                    requires_approval=True,
                    status="pending",
                )

                recommendations.append(recommendation)

        return recommendations