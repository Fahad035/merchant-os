from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class AuditLog(BaseModel):
    __tablename__ = "audit_logs"

    merchant_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("merchants.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    recommendation_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("ai_recommendations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    event_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    actor: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    details: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    merchant = relationship(
        "Merchant",
        back_populates="audit_logs",
    )

    recommendation = relationship(
        "AIRecommendation",
        back_populates="audit_logs",
    )

    def __repr__(self) -> str:
        return (
            f"<AuditLog("
            f"event='{self.event_type}', "
            f"actor='{self.actor}')>"
        )