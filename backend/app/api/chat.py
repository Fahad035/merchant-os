from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.conversation_repository import (
    ConversationRepository,
)
from app.repositories.message_repository import (
    MessageRepository,
)
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ConversationResponse,
    MessageResponse,
)
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
def send_message(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    service = ChatService(db)

    try:
        return service.chat(request)

    except ValueError as exc:
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )


@router.get(
    "/history/{merchant_id}",
    response_model=list[ConversationResponse],
)
def conversation_history(
    merchant_id: UUID,
    db: Session = Depends(get_db),
):
    repo = ConversationRepository(db)

    conversations = repo.get_by_merchant(
        merchant_id,
    )

    return [
        ConversationResponse.model_validate(c)
        for c in conversations
    ]


@router.get(
    "/conversation/{conversation_id}",
    response_model=list[MessageResponse],
)
def conversation_messages(
    conversation_id: UUID,
    db: Session = Depends(get_db),
):
    repo = MessageRepository(db)

    messages = repo.get_messages(
        conversation_id,
    )

    return [
        MessageResponse.model_validate(m)
        for m in messages
    ]