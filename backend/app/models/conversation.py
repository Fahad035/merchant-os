from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Conversation(BaseModel):
    __tablename__ = "conversations"

    merchant_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("merchants.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
        default="New Conversation",
    )

    merchant = relationship(
        "Merchant",
        back_populates="conversations",
    )

    messages = relationship(
        "Message",
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="Message.created_at",
    )

    def __repr__(self) -> str:
        return (
            f"<Conversation("
            f"id={self.id}, "
            f"title='{self.title}')>"
        )