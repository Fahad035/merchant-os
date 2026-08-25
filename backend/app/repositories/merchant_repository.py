from sqlalchemy.orm import Session

from app.models.merchant import Merchant
from app.repositories.base_repository import BaseRepository


class MerchantRepository(BaseRepository[Merchant]):
    def __init__(self, db: Session):
        super().__init__(db, Merchant)

    def get_by_email(self, email: str) -> Merchant | None:
        return (
            self.db.query(Merchant)
            .filter(Merchant.email == email)
            .first()
        )

    def search(self, keyword: str):
        return (
            self.db.query(Merchant)
            .filter(
                Merchant.business_name.ilike(f"%{keyword}%")
            )
            .all()
        )