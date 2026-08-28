from uuid import UUID

from pydantic import BaseModel


class RecommendationActionRequest(BaseModel):

    recommendation_id: UUID


class RecommendationResponse(BaseModel):

    id: UUID

    status: str

    message: str