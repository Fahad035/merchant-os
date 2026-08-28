from decimal import Decimal
from uuid import uuid4

from app.models.ai_recommendation import AIRecommendation
from app.services.recommendation_engine import RecommendationEngine


class CrossSellRecommendationEngine(RecommendationEngine):
    """
    Generates cross-sell recommendations from
    historical order data.

    Example:

    Laptop
        ↓
    Recommend Mouse
    """

    def generate(self, merchant_id):

        products = self.load_products(merchant_id)
        orders = self.load_orders(merchant_id)

        if not products or not orders:
            return []

        grouped_orders = self.group_order_items(
            orders
        )

        pair_counts = self.count_product_pairs(
            grouped_orders
        )

        product_lookup = {
            product.id: product
            for product in products
        }

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

            primary = product_lookup[first_id]
            secondary = product_lookup[second_id]

            confidence = min(
                98,
                60 + (frequency * 8),
            )

            revenue = (
                Decimal(str(secondary.price))
                * Decimal(str(frequency))
            )

            recommendations.append(

                AIRecommendation(

                    merchant_id=merchant_id,

                    action_id=f"CROSS-{uuid4().hex[:8].upper()}",

                    title=f"Recommend {secondary.name} with {primary.name}",

                    explanation=(
                        f"Customers purchasing "
                        f"{primary.name} frequently "
                        f"also purchase "
                        f"{secondary.name}."
                    ),

                    action_type="cross_sell",

                    expected_revenue=revenue,

                    confidence=confidence,

                    risk_level="low",

                    requires_approval=True,

                    status="pending",
                )

            )

        return recommendations