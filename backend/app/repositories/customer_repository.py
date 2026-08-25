from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.repositories.base_repository import BaseRepository


class CustomerRepository(BaseRepository[Customer]):
    def __init__(self, db: Session):
        super().__init__(db, Customer)

    def get_by_email(self, email: str):
        return (
            self.db.query(Customer)
            .filter(Customer.email == email)
            .first()
        )