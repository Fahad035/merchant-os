from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Merchant(BaseModel):
    """
    Merchant information.
    """

    __tablename__ = "merchants"

    business_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True,
    )

    owner_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
        index=True,
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        unique=True,
    )

    industry: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    # Added for login/signup. Nullable so existing seeded merchant rows
    # (created before auth existed) don't break — they simply can't log
    # in until a password is set for them.
    hashed_password: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    products = relationship(
        "Product",
        back_populates="merchant",
        cascade="all, delete-orphan",
    )

    customers = relationship(
        "Customer",
        back_populates="merchant",
        cascade="all, delete-orphan",
    )

    orders = relationship(
        "Order",
        back_populates="merchant",
        cascade="all, delete-orphan",
    )

    recommendations = relationship(
        "AIRecommendation",
        back_populates="merchant",
        cascade="all, delete-orphan",
    )

    audit_logs = relationship(
        "AuditLog",
        back_populates="merchant",
        cascade="all, delete-orphan",
    )

    conversations = relationship(
        "Conversation",
        back_populates="merchant",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return (
            f"<Merchant("
            f"id={self.id}, "
            f"business_name='{self.business_name}'"
            f")>"
        )