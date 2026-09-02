from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.merchant import Merchant
from app.repositories.merchant_repository import MerchantRepository
from app.schemas.auth import LoginRequest, SignupRequest


class AuthError(Exception):
    """Raised for any user-facing auth failure (bad credentials, duplicate email, etc.)."""


class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = MerchantRepository(db)

    def signup(self, payload: SignupRequest) -> tuple[Merchant, str]:
        existing = self.repository.get_by_email(payload.email)
        if existing is not None:
            raise AuthError("An account with this email already exists.")

        merchant = self.repository.create(
            business_name=payload.business_name,
            owner_name=payload.owner_name,
            email=payload.email,
            phone=payload.phone,
            industry=payload.industry,
            hashed_password=hash_password(payload.password),
        )

        token = create_access_token(merchant.id)
        return merchant, token

    def login(self, payload: LoginRequest) -> tuple[Merchant, str]:
        merchant = self.repository.get_by_email(payload.email)

        if merchant is None or not merchant.hashed_password:
            raise AuthError("Invalid email or password.")

        if not verify_password(payload.password, merchant.hashed_password):
            raise AuthError("Invalid email or password.")

        token = create_access_token(merchant.id)
        return merchant, token