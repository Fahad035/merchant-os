from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.recommendation_repository import (
    RecommendationRepository,
)
from app.schemas.recommendation import (
    RecommendationActionRequest,
    RecommendationResponse,
)
from app.services.recommendation_execution_service import (
    RecommendationExecutionService,
)

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)


@router.get(
    "",
    response_model=list[RecommendationResponse],
)
def list_recommendations(
    merchant_id: UUID,
    db: Session = Depends(get_db),
):

    repository = RecommendationRepository(db)

    return repository.get_by_merchant(
        merchant_id
    )


@router.post("/approve")
def approve(
    request: RecommendationActionRequest,
    db: Session = Depends(get_db),
):

    service = RecommendationExecutionService(db)

    try:

        recommendation = service.approve(
            request.recommendation_id
        )

        return {
            "success": True,
            "recommendation": recommendation,
        }

    except ValueError as exc:

        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )


@router.post("/reject")
def reject(
    request: RecommendationActionRequest,
    db: Session = Depends(get_db),
):

    service = RecommendationExecutionService(db)

    try:

        recommendation = service.reject(
            request.recommendation_id
        )

        return {
            "success": True,
            "recommendation": recommendation,
        }

    except ValueError as exc:

        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )

@router.post("/execute")
def execute(
    request: RecommendationActionRequest,
    db: Session = Depends(get_db),
):

    service = RecommendationExecutionService(db)

    try:

        result = service.execute(
            request.recommendation_id
        )

        return result

    except ValueError as exc:

        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )