from uuid import UUID

from sqlalchemy.orm import Session

from app.models.message import Message
from app.repositories.base_repository import BaseRepository


class MessageRepository(BaseRepository[Message]):
    def __init__(self, db: Session):
        super().__init__(db, Message)

    def create_message(
        self,
        conversation_id: UUID,
        role: str,
        content: str,
    ) -> Message:

        message = Message(
            conversation_id=conversation_id,
            role=role,
            content=content,
        )

        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message

    def get_messages(
        self,
        conversation_id: UUID,
    ) -> list[Message]:

        return (
            self.db.query(Message)
            .filter(
                Message.conversation_id == conversation_id
            )
            .order_by(
                Message.created_at.asc()
            )
            .all()
        )

    def latest_message(
        self,
        conversation_id: UUID,
    ) -> Message | None:

        return (
            self.db.query(Message)
            .filter(
                Message.conversation_id == conversation_id
            )
            .order_by(
                Message.created_at.desc()
            )
            .first()
        )



