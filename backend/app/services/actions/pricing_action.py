from decimal import Decimal

from app.models.product import Product
from app.services.actions.base_action import BaseAction


class PricingAction(BaseAction):

    def execute(self, recommendation):

        product = (
            self.db.query(Product)
            .filter(
                Product.merchant_id ==
                recommendation.merchant_id
            )
            .order_by(Product.stock.desc())
            .first()
        )

        if product is None:

            return {
                "success": False,
                "message": "No product found.",
            }

        if product.stock == 0:

            return {
                "success": False,
                "message": f"{product.name} is out of stock.",
            }

        old_price = Decimal(product.price)

        new_price = (
            old_price * Decimal("1.05")
        ).quantize(
            Decimal("0.01")
        )

        product.price = new_price

        self.db.commit()

        return {
            "success": True,
            "message": (
                f"{product.name} price updated "
                f"from ₹{old_price} to ₹{new_price}"
            ),
        }