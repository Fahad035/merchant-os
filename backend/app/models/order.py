from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Order(BaseModel):
    __tablename__ = "orders"

    merchant_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("merchants.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    customer_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("customers.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    order_number: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        unique=True,
        index=True,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="pending",
    )

    total_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    merchant = relationship(
        "Merchant",
        back_populates="orders",
    )

    customer = relationship(
        "Customer",
        back_populates="orders",
    )

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"<Order(number='{self.order_number}')>"