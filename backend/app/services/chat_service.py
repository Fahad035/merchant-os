from sqlalchemy.orm import Session

from app.repositories.conversation_repository import ConversationRepository
from app.repositories.message_repository import MessageRepository
from app.repositories.merchant_repository import MerchantRepository
from app.repositories.order_repository import OrderRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.recommendation_repository import RecommendationRepository

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ConversationResponse,
    MessageResponse,
)

from app.services.ai.llm_service import LLMService
from app.services.ai.prompts import PromptBuilder


class ChatService:

    def __init__(self, db: Session):

        self.db = db

        self.conversation_repo = ConversationRepository(db)
        self.message_repo = MessageRepository(db)

        self.merchant_repo = MerchantRepository(db)
        self.product_repo = ProductRepository(db)
        self.order_repo = OrderRepository(db)
        self.recommendation_repo = RecommendationRepository(db)

        self.llm = LLMService()

    # ---------------------------------------------------------

    def chat(
        self,
        request: ChatRequest,
    ) -> ChatResponse:

        if request.conversation_id:

            conversation = self.conversation_repo.get(
                request.conversation_id
            )

            if conversation is None:
                raise ValueError(
                    "Conversation not found"
                )

        else:

            conversation = (
                self.conversation_repo.create_conversation(
                    merchant_id=request.merchant_id,
                    title=self._generate_title(
                        request.message
                    ),
                )
            )

        user_message = self.message_repo.create_message(
            conversation_id=conversation.id,
            role="user",
            content=request.message,
        )

        merchant = self.merchant_repo.get(
            request.merchant_id
        )

        products = self.product_repo.get_by_merchant(
            request.merchant_id
        )

        orders = self.order_repo.get_by_merchant(
            request.merchant_id
        )

        recommendations = (
            self.recommendation_repo.get_by_merchant(
                request.merchant_id
            )
        )

        prompt = PromptBuilder.chat_prompt(
            merchant_name=merchant.business_name,
            question=request.message,
            products=products,
            orders=orders,
            recommendations=recommendations,
        )

        try:

            ai_response = self.llm.ask(prompt)

            if not ai_response:
                ai_response = (
                    "The AI returned an empty response."
                )

        except Exception as e:

            print("Chat AI Error:")
            print(e)

            ai_response = (
                "Sorry, I couldn't contact the AI service. "
                "Please try again later."
            )

        assistant_message = (
            self.message_repo.create_message(
                conversation_id=conversation.id,
                role="assistant",
                content=ai_response,
            )
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

    # ---------------------------------------------------------

    def _generate_title(
        self,
        message: str,
    ) -> str:

        prompt = f"""
Generate a short conversation title.

Maximum 5 words.

Message:
{message}

Return title only.
"""

        try:

            title = self.llm.ask(prompt)

            if title:
                return title.strip()

        except Exception as e:

            print("Title Error:", e)

        return "New Conversation"