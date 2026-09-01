from uuid import UUID

from sqlalchemy.orm import Session, joinedload

from app.models.order import Order
from app.models.order_item import OrderItem
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

    def get_by_merchant(self, merchant_id: UUID):
        return (
            self.db.query(Order)
            .options(
                joinedload(Order.customer),
                joinedload(Order.items).joinedload(OrderItem.product),
            )
            .filter(Order.merchant_id == merchant_id)
            .all()
        )