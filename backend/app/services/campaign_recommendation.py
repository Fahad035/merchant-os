from decimal import Decimal
from uuid import uuid4

from app.models.ai_recommendation import AIRecommendation
from app.services.recommendation_engine import RecommendationEngine


class CampaignRecommendationEngine(RecommendationEngine):
    """
    AI Campaign Recommendation Engine

    Generates:

    - Flash Sale
    - Clearance Campaign
    - Premium Promotion
    - Bundle Promotion
    """

    LOW_STOCK = 10
    OVER_STOCK = 300

    def generate(self, merchant_id):

        products = self.load_products(merchant_id)
        orders = self.load_orders(merchant_id)

        recommendations = []

        # ---------------------------------------
        # Inventory-based campaigns
        # ---------------------------------------

        for product in products:

            stock = product.stock_quantity
            price = Decimal(str(product.price))

            # Clearance Sale

            if stock >= self.OVER_STOCK:

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"CAMP-{uuid4().hex[:8].upper()}",

                        title=f"Launch Clearance Sale for {product.name}",

                        explanation=(
                            f"{product.name} has excessive inventory. "
                            "Create a clearance campaign."
                        ),

                        action_type="campaign",

                        expected_revenue=price * Decimal("0.12"),

                        confidence=94,

                        risk_level="low",

                        requires_approval=True,

                        status="pending",

                    )

                )

            # Flash Sale

            elif stock <= self.LOW_STOCK:

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"CAMP-{uuid4().hex[:8].upper()}",

                        title=f"Launch Flash Sale for {product.name}",

                        explanation=(
                            f"{product.name} is nearly sold out. "
                            "A flash sale may increase urgency."
                        ),

                        action_type="campaign",

                        expected_revenue=price * Decimal("0.10"),

                        confidence=88,

                        risk_level="medium",

                        requires_approval=True,

                        status="pending",

                    )

                )

            # Premium Promotion

            elif price >= Decimal("1000"):

                recommendations.append(

                    AIRecommendation(

                        merchant_id=merchant_id,

                        action_id=f"CAMP-{uuid4().hex[:8].upper()}",

                        title=f"Promote Premium Product {product.name}",

                        explanation=(
                            f"{product.name} is a premium product. "
                            "Highlight it in paid campaigns."
                        ),

                        action_type="campaign",

                        expected_revenue=price * Decimal("0.08"),

                        confidence=82,

                        risk_level="low",

                        requires_approval=True,

                        status="pending",

                    )

                )

        # ---------------------------------------
        # Bundle Campaigns
        # ---------------------------------------

        grouped = self.group_order_items(orders)
        pair_counts = self.count_product_pairs(grouped)

        product_lookup = {
            product.id: product
            for product in products
        }

        for (first_id, second_id), frequency in pair_counts.items():

            if frequency < 3:
                continue

            if first_id not in product_lookup:
                continue

            if second_id not in product_lookup:
                continue

            first = product_lookup[first_id]
            second = product_lookup[second_id]

            recommendations.append(

                AIRecommendation(

                    merchant_id=merchant_id,

                    action_id=f"CAMP-{uuid4().hex[:8].upper()}",

                    title=f"Bundle Campaign: {first.name} + {second.name}",

                    explanation=(
                        f"Customers purchased these products together "
                        f"{frequency} times. Promote them as a bundle."
                    ),

                    action_type="campaign",

                    expected_revenue=(
                        Decimal(str(first.price))
                        + Decimal(str(second.price))
                    ) * Decimal("0.15"),

                    confidence=min(98, 70 + frequency * 5),

                    risk_level="low",

                    requires_approval=True,

                    status="pending",

                )

            )

        return recommendations