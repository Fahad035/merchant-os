from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    merchant_id: UUID

    name: str
    sku: str

    description: str | None

    price: Decimal

    stock: int

    category: str


class ProductListResponse(BaseModel):
    products: list[ProductResponse]
    total: int