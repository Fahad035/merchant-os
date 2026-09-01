from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.merchant import Merchant

router = APIRouter(
    prefix="/merchant",
    tags=["Merchant"],
)


@router.get("")
def get_merchant(db: Session = Depends(get_db)):
    merchant = db.query(Merchant).first()

    if merchant is None:
        raise HTTPException(
            status_code=404,
            detail="Merchant not found",
        )

    return {
        "id": str(merchant.id),
        "business_name": merchant.business_name,
    }