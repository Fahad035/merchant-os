from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import decode_access_token
from app.repositories.merchant_repository import MerchantRepository


def get_current_merchant(
    request: Request,
    db: Session = Depends(get_db),
):
    print("=" * 60)
    print("HEADERS")
    print(dict(request.headers))
    print()

    print("COOKIES")
    print(request.cookies)
    print("=" * 60)

    token = request.cookies.get(settings.COOKIE_NAME)

    if not token:
        raise HTTPException(401, "No cookie")

    merchant_id = decode_access_token(token)

    if merchant_id is None:
        raise HTTPException(401, "Invalid token")

    merchant = MerchantRepository(db).get(merchant_id)

    if merchant is None:
        raise HTTPException(401, "Merchant not found")

    return merchant