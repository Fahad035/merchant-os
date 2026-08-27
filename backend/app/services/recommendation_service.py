from sqlalchemy.orm import Session

from app.services.bundle_recommendation import (
    BundleRecommendationEngine,
)


class RecommendationService:

    def __init__(self, db: Session):

        self.bundle_engine = BundleRecommendationEngine(db)

    def generate(self, merchant_id):

        recommendations = self.bundle_engine.generate(
            merchant_id
        )

        self.bundle_engine.save_all(
            recommendations
        )

        return recommendations