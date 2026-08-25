from sqlalchemy.orm import Session

from app.repositories.product_repository import ProductRepository


class ProductService:
    def __init__(self, db: Session):
        self.repository = ProductRepository(db)

    def get_products(self):
        products = self.repository.get_all()

        return {
            "products": products,
            "total": len(products),
        }

    def low_stock(self):
        return self.repository.low_stock()

    def category(self, category: str):
        return self.repository.by_category(category)