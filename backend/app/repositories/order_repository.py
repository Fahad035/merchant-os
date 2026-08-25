from sqlalchemy.orm import Session

from app.models.order import Order
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