from decimal import Decimal

from sqlalchemy import Boolean, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class AIRecommendation(BaseModel):
    __tablename__ = "ai_recommendations"

    merchant_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("merchants.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    action_id: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        unique=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    explanation: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    action_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    expected_revenue: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    confidence: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    risk_level: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    requires_approval: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="pending",
        nullable=False,
        index=True,
    )

    merchant = relationship(
        "Merchant",
        back_populates="recommendations",
    )

    audit_logs = relationship(
        "AuditLog",
        back_populates="recommendation",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return (
            f"<AIRecommendation("
            f"action_id='{self.action_id}', "
            f"status='{self.status}')>"
        )