from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ChatRequest(BaseModel):
    conversation_id: UUID | None = None
    merchant_id: UUID
    message: str


class MessageResponse(BaseModel):
    id: UUID
    role: str
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ConversationResponse(BaseModel):
    id: UUID
    merchant_id: UUID
    title: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ChatResponse(BaseModel):
    conversation: ConversationResponse
    user_message: MessageResponse
    assistant_message: MessageResponse