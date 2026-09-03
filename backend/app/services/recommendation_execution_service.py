from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.recommendation_repository import (
    RecommendationRepository,
)
from app.repositories.audit_repository import (
    AuditRepository,
)
from app.services.actions.action_factory import ActionFactory


class RecommendationExecutionService:

    def __init__(self, db: Session):

        self.db = db

        self.recommendations = RecommendationRepository(db)

        self.audit_logs = AuditRepository(db)

    # --------------------------------------------------

    def approve(self, recommendation_id):

        recommendation = self.recommendations.get(
            recommendation_id
    )

        if recommendation is None:
            raise ValueError("Recommendation not found.")

        recommendation.status = "approved"

        self.db.commit()

        self.audit_logs.create(
        merchant_id=recommendation.merchant_id,
        recommendation_id=recommendation.id,
        event_type="Approved",
        actor="Merchant",
        details="Merchant approved recommendation.",
    )

        return recommendation
    # --------------------------------------------------

    def reject(
    self,
    recommendation_id: UUID,
    ):

        recommendation = self.recommendations.get(
        recommendation_id
    )

        if recommendation is None:
            raise ValueError(
            "Recommendation not found."
        )

        recommendation.status = "rejected"

        self.db.commit()

        self.audit_logs.create(
        merchant_id=recommendation.merchant_id,
        recommendation_id=recommendation.id,
        event_type="Rejected",
        actor="Merchant",
        details="Merchant rejected recommendation.",
    )

        return recommendation

    def execute(self, recommendation_id):

        recommendation = self.recommendations.get(
        recommendation_id
    )

        if recommendation is None:
            raise ValueError("Recommendation not found.")

        if recommendation.status != "approved":
            raise ValueError(
            "Recommendation must be approved first."
        )

        action = ActionFactory.create(
            recommendation.action_type,
            self.db,
    )

        result = action.execute(
            recommendation
    )

        if result["success"]:
            recommendation.status = "executed"

        self.db.commit()

        self.audit_logs.create(
        merchant_id=recommendation.merchant_id,
        recommendation_id=recommendation.id,
        event_type="Executed" if result["success"] else "Failed",
        actor="System",
        details=result["message"],
    )

        return result