from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.dependencies import get_current_merchant
from app.models.merchant import Merchant
from app.schemas.auth import LoginRequest, MerchantOut, SignupRequest
from app.services.auth_service import AuthError, AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


def _set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="none",      # <-- IMPORTANT
        max_age=settings.JWT_EXPIRE_MINUTES * 60,
        path="/",
    )


@router.post(
    "/signup",
    response_model=MerchantOut,
    status_code=status.HTTP_201_CREATED,
)
def signup(
    payload: SignupRequest,
    response: Response,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    try:
        merchant, token = service.signup(payload)
    except AuthError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc

    _set_auth_cookie(response, token)
    return merchant


@router.post(
    "/login",
    response_model=MerchantOut,
)
def login(
    payload: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    try:
        merchant, token = service.login(payload)
    except AuthError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        ) from exc

    _set_auth_cookie(response, token)
    return merchant


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(settings.COOKIE_NAME, path="/")
    return {"message": "Logged out."}


@router.get(
    "/me",
    response_model=MerchantOut,
)
def me(current_merchant: Merchant = Depends(get_current_merchant)):
    return current_merchant