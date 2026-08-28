from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.order_repository import OrderRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.recommendation_repository import (
    RecommendationRepository,
)

from collections import defaultdict

class RecommendationEngine:
    """
    Base engine for every AI recommendation.

    Future engines:
        - Bundle
        - Cross Sell
        - Upsell
        - Pricing
        - Inventory
        - Campaigns
    """

    def __init__(self, db: Session):

        self.db = db

        self.products = ProductRepository(db)
        self.orders = OrderRepository(db)
        self.recommendations = RecommendationRepository(db)

    # -----------------------------------------

    def load_products(self, merchant_id: UUID):

        return self.products.get_by_merchant(
            merchant_id
        )

    # -----------------------------------------

    def load_orders(self, merchant_id: UUID):

        return self.orders.get_by_merchant(
            merchant_id
        )

    # -----------------------------------------

    def load_recommendations(
        self,
        merchant_id: UUID,
    ):

        return self.recommendations.get_by_merchant(
            merchant_id
        )

    # -----------------------------------------

    def generate(
        self,
        merchant_id: UUID,
    ):
        """
        Placeholder.

        Real algorithms arrive in Part 6.2.
        """

        products = self.load_products(
            merchant_id
        )

        orders = self.load_orders(
            merchant_id
        )

        return {
            "products": products,
            "orders": orders,
        }


    def group_order_items(self, orders):
        """
        Returns

        {
            order_id: [product_id, product_id, ...]
        }
        """

        grouped = defaultdict(list)

        for order in orders:
            for item in order.items:
                grouped[order.id].append(item.product_id)

        return grouped

    def count_product_pairs(self, grouped_orders):

        pair_counter = defaultdict(int)

        for product_ids in grouped_orders.values():

            unique = sorted(set(product_ids))

            for i in range(len(unique)):
                for j in range(i + 1, len(unique)):
                    pair = (unique[i], unique[j])
                    pair_counter[pair] += 1

        return pair_counter

    def save_all(self, recommendations):

        unique = []

        for recommendation in recommendations:

            exists = (
                self.recommendations.exists(
                    recommendation.merchant_id,
                    recommendation.action_type,
                    recommendation.title,
                )
            )

            if exists:
                continue

            unique.append(recommendation)

        if unique:

            return self.recommendations.bulk_create(
                unique
            )

        return []