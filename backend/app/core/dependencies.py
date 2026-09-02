from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.merchant import Merchant
from app.repositories.merchant_repository import MerchantRepository


def get_current_merchant(
    request: Request,
    db: Session = Depends(get_db),
) -> Merchant:
    """
    Resolve the logged-in merchant from the auth cookie.

    Not applied to any existing router — opt-in only, so current
    endpoints keep working exactly as before. Use this dependency on
    any *new* route that should require login.
    """
    token = request.cookies.get(settings.COOKIE_NAME)

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated.",
        )

    merchant_id = decode_access_token(token)
    if merchant_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid. Please log in again.",
        )

    merchant = MerchantRepository(db).get(merchant_id)
    if merchant is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account no longer exists.",
        )

    return merchant