from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Message(BaseModel):
    __tablename__ = "messages"

    conversation_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("conversations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    role: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    conversation = relationship(
        "Conversation",
        back_populates="messages",
    )

    def __repr__(self) -> str:
        return (
            f"<Message("
            f"role='{self.role}')>"
        )