from sqlalchemy.orm import Session

from app.models.product import Product
from app.repositories.base_repository import BaseRepository


class ProductRepository(BaseRepository[Product]):
    def __init__(self, db: Session):
        super().__init__(db, Product)

    def low_stock(self, threshold: int = 10):
        return (
            self.db.query(Product)
            .filter(Product.stock <= threshold)
            .all()
        )

    def by_category(self, category: str):
        return (
            self.db.query(Product)
            .filter(Product.category == category)
            .all()
        )

    def get_by_merchant(self, merchant_id):
        return (
            self.db.query(Product)
            .filter(
                Product.merchant_id == merchant_id
            )
            .all()
        )