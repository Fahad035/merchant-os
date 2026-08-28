from decimal import Decimal
from uuid import uuid4

from app.models.ai_recommendation import AIRecommendation
from app.services.recommendation_engine import RecommendationEngine


class BundleRecommendationEngine(
    RecommendationEngine
):

    def generate(self, merchant_id):

        products = self.load_products(
            merchant_id
        )

        product_lookup = {
            p.id: p
            for p in products
        }

        orders = self.load_orders(
            merchant_id
        )

        grouped = self.group_order_items(
            orders
        )

        pair_counts = self.count_product_pairs(
            grouped
        )

        recommendations = []

        for (
            first_id,
            second_id,
        ), frequency in pair_counts.items():

            if frequency < 2:
                continue

            if first_id not in product_lookup:
                continue

            if second_id not in product_lookup:
                continue

            first = product_lookup[first_id]
            second = product_lookup[second_id]

            revenue = (
                Decimal(first.price)
                + Decimal(second.price)
            ) * Decimal("0.15")

            confidence = min(
                95,
                60 + frequency * 5,
            )

            recommendations.append(

                AIRecommendation(

                    merchant_id=merchant_id,

                    action_id=f"BUNDLE-{uuid4().hex[:8].upper()}",

                    title=f"Bundle {first.name} + {second.name}",

                    explanation=(
                        f"These products were purchased together "
                        f"{frequency} times."
                    ),

                    action_type="bundle",

                    expected_revenue=revenue,

                    confidence=confidence,

                    risk_level="low",

                    requires_approval=True,

                    status="pending",
                )
            )

        return recommendations