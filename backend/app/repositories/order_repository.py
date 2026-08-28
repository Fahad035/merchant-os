from sqlalchemy.orm import Session, joinedload
from app.models.order import Order
from app.models.order_item import OrderItem  # 👈 Added missing import
from app.repositories.base_repository import BaseRepository

class OrderRepository(BaseRepository[Order]):
    def __init__(self, db: Session):
        super().__init__(db, Order)

    def by_status(self, status: str):
        return (
            self.db.query(Order)
            .filter(Order.status == status)
            .all()
        )

    def get_by_merchant(self, merchant_id: int): # 👈 Added type hinting
        return (
            self.db.query(Order)
            .options(
                joinedload(Order.items)
                .joinedload(OrderItem.product)
            )
            .filter(Order.merchant_id == merchant_id)
            .all()
        )
