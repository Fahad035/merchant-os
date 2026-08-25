from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.conversation_repository import ConversationRepository
from app.repositories.message_repository import MessageRepository
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ConversationResponse,
    MessageResponse,
)


class ChatService:
    def __init__(self, db: Session):
        self.db = db
        self.conversation_repo = ConversationRepository(db)
        self.message_repo = MessageRepository(db)

    def chat(self, request: ChatRequest) -> ChatResponse:
        """
        Process a merchant message and return an AI response.
        """

        # Continue existing conversation
        if request.conversation_id:
            conversation = self.conversation_repo.get(
                request.conversation_id
            )

            if conversation is None:
                raise ValueError("Conversation not found")

        # Create new conversation
        else:
            title = self._generate_title(request.message)

            conversation = (
                self.conversation_repo.create_conversation(
                    merchant_id=request.merchant_id,
                    title=title,
                )
            )

        # Save merchant message
        user_message = self.message_repo.create_message(
            conversation_id=conversation.id,
            role="user",
            content=request.message,
        )

        # Generate AI response
        ai_text = self._generate_ai_response(request.message)

        # Save assistant response
        assistant_message = self.message_repo.create_message(
            conversation_id=conversation.id,
            role="assistant",
            content=ai_text,
        )

        return ChatResponse(
            conversation=ConversationResponse.model_validate(
                conversation
            ),
            user_message=MessageResponse.model_validate(
                user_message
            ),
            assistant_message=MessageResponse.model_validate(
                assistant_message
            ),
        )

    def _generate_title(self, message: str) -> str:
        """
        Generate a short conversation title.
        """

        words = message.split()

        if not words:
            return "New Conversation"

        return " ".join(words[:5])

    def _generate_ai_response(self, message: str) -> str:
        """
        Mock AI response.
        """

        text = message.lower()

        if "revenue" in text:

            return (
                "I analyzed your business.\n\n"
                "I found three revenue opportunities:\n\n"
                "• Bundle Running Shoes with Sports Socks\n"
                "Expected Revenue: ₹18,000\n\n"
                "• Upsell Shoe Care Kit\n"
                "Expected Revenue: ₹9,000\n\n"
                "• Weekend Campaign\n"
                "Expected Revenue: ₹32,000\n\n"
                "Would you like me to prepare these proposals?"
            )

        if "campaign" in text:

            return (
                "I recommend targeting inactive customers "
                "with a 10% weekend campaign."
            )

        if "orders" in text:

            return (
                "Your recent order trend looks healthy.\n"
                "Average order value is increasing."
            )

        return (
            "I understand your request.\n\n"
            "I'm currently running in demo mode.\n"
            "The AI Planner in Milestone 5 will provide "
            "dynamic recommendations."
        )