from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Customer(BaseModel):
    __tablename__ = "customers"

    merchant_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("merchants.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    full_name: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    merchant = relationship(
        "Merchant",
        back_populates="customers",
    )

    orders = relationship(
        "Order",
        back_populates="customer",
    )

    def __repr__(self):
        return f"<Customer(name='{self.full_name}')>"