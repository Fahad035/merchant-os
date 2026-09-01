from app.models.product import Product
from app.services.actions.base_action import BaseAction


class InventoryAction(BaseAction):

    def execute(self, recommendation):

        products = (
            self.db.query(Product)
            .filter(
                Product.merchant_id ==
                recommendation.merchant_id
            )
            .all()
        )

        low_stock = [
            p.name
            for p in products
            if p.stock < 20
        ]

        return {
            "success": True,
            "message":
                f"{len(low_stock)} low stock products detected.",
        }