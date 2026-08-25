from uuid import UUID

from sqlalchemy.orm import Session

from app.models.conversation import Conversation
from app.repositories.base_repository import BaseRepository


class ConversationRepository(BaseRepository[Conversation]):
    def __init__(self, db: Session):
        super().__init__(db, Conversation)

    def get_by_merchant(
        self,
        merchant_id: UUID,
    ) -> list[Conversation]:
        return (
            self.db.query(Conversation)
            .filter(
                Conversation.merchant_id == merchant_id
            )
            .order_by(
                Conversation.updated_at.desc()
            )
            .all()
        )

    def create_conversation(
        self,
        merchant_id: UUID,
        title: str,
    ) -> Conversation:

        conversation = Conversation(
            merchant_id=merchant_id,
            title=title,
        )

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation

    