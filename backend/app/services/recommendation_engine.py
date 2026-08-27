from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.order_repository import OrderRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.recommendation_repository import (
    RecommendationRepository,
)


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

    def save_all(self, recommendations):

        return self.recommendations.bulk_create(
            recommendations
        )