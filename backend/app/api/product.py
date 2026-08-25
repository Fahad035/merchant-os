from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.product import (
    ProductListResponse,
    ProductResponse,
)

from app.services.product_service import ProductService

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


@router.get(
    "",
    response_model=ProductListResponse,
)
def products(
    db: Session = Depends(get_db),
):
    service = ProductService(db)

    return service.get_products()


@router.get(
    "/low-stock",
    response_model=list[ProductResponse],
)
def low_stock(
    db: Session = Depends(get_db),
):
    service = ProductService(db)

    return service.low_stock()


@router.get(
    "/category/{category}",
    response_model=list[ProductResponse],
)
def category(
    category: str,
    db: Session = Depends(get_db),
):
    service = ProductService(db)

    return service.category(category)