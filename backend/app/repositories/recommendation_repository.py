from sqlalchemy.orm import Session
from uuid import UUID

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

    def exists(
        self,
        merchant_id,
        action_type,
        title,
        ):

        return (
            self.db.query(
                AIRecommendation
            )
            .filter(
                AIRecommendation.merchant_id
                == merchant_id,
                AIRecommendation.action_type
                == action_type,
                AIRecommendation.title
                == title,
                AIRecommendation.status
                == "pending",
            )
            .first()
        )


    def get(
    self,
    recommendation_id: UUID,
    ):

        return (

            self.db.query(
                AIRecommendation
            )

            .filter(
                AIRecommendation.id == recommendation_id
            )

            .first()

        )