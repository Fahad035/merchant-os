from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class OrderItem(BaseModel):
    __tablename__ = "order_items"

    order_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("orders.id", ondelete="CASCADE"),
        nullable=False,
    )

    product_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
    )

    quantity: Mapped[int] = mapped_column(
        nullable=False,
        default=1,
    )

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    order = relationship(
        "Order",
        back_populates="items",
    )

    product = relationship(
        "Product",
        back_populates="order_items",
    )

    def __repr__(self):
        return f"<OrderItem(quantity={self.quantity})>"