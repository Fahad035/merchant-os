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

    def get_by_merchant(self,merchant_id,):
        return (
            self.db.query(AIRecommendation)
            .filter(
                AIRecommendation.merchant_id
                == merchant_id
            )
            .all()
        )

    def bulk_create(self, recommendations):

        if not recommendations:
            return []

        self.db.add_all(recommendations)

        self.db.commit()

        for recommendation in recommendations:
            self.db.refresh(recommendation)

        return recommendations