from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Product(BaseModel):
    __tablename__ = "products"

    merchant_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("merchants.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    sku: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    stock: Mapped[int] = mapped_column(
        nullable=False,
        default=0,
    )

    category: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    merchant = relationship(
        "Merchant",
        back_populates="products",
    )

    order_items = relationship(
        "OrderItem",
        back_populates="product",
    )

    def __repr__(self):
        return f"<Product(name='{self.name}')>"