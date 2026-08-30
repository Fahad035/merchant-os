from random import choice

from sqlalchemy.orm import Session

from app.models.ai_recommendation import AIRecommendation
from app.models.audit_log import AuditLog


EVENTS = [
    "Created",
    "Reviewed",
    "Approved",
    "Rejected",
    "Executed",
]

ACTORS = [
    "Merchant",
    "MerchantOS AI",
    "System",
]


def seed_audit_logs(
    db: Session,
    merchant_id,
):

    recommendations = (
        db.query(AIRecommendation)
        .filter(
            AIRecommendation.merchant_id == merchant_id
        )
        .all()
    )

    if not recommendations:
        return

    logs = []

    for recommendation in recommendations:

        for _ in range(3):

            logs.append(
                AuditLog(
                    merchant_id=merchant_id,
                    recommendation_id=recommendation.id,
                    event_type=choice(EVENTS),
                    actor=choice(ACTORS),
                    details="Automatically generated audit event.",
                )
            )

    db.add_all(logs)
    db.commit()

    print(f"✓ Seeded {len(logs)} audit logs")