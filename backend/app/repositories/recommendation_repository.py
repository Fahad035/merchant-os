from sqlalchemy.orm import Session

from app.models.ai_recommendation import AIRecommendation
from app.repositories.base_repository import BaseRepository


class RecommendationRepository(BaseRepository[AIRecommendation]):
    def __init__(self, db: Session):
        super().__init__(db, AIRecommendation)

    def pending(self):
        return (
            self.db.query(AIRecommendation)
            .filter(
                AIRecommendation.status == "pending"
            )
            .all()
        )

    def approved(self):
        return (
            self.db.query(AIRecommendation)
            .filter(
                AIRecommendation.status == "approved"
            )
            .all()
        )