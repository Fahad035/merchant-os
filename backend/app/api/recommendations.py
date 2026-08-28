from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.recommendation_repository import (
    RecommendationRepository,
)
from app.schemas.recommendation import (
    RecommendationResponse,
)

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)


@router.get(
    "/",
    response_model=list[RecommendationResponse],
)
def list_recommendations(
    merchant_id: str,
    db: Session = Depends(get_db),
):

    repository = RecommendationRepository(db)

    recommendations = repository.get_by_merchant(
        merchant_id
    )

    return recommendations