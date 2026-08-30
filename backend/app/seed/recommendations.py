from decimal import Decimal
from random import choice, randint

from sqlalchemy.orm import Session

from app.models.ai_recommendation import AIRecommendation


TITLES = [
    "Bundle Running Shoes with Sports Socks",
    "Launch Weekend Flash Sale",
    "Restock Fast Moving Products",
    "Cross-sell Water Bottles",
    "Upsell Premium Running Shoes",
    "Create Festival Campaign",
    "Discount Slow Moving Inventory",
    "Target Repeat Customers",
    "Email Abandoned Carts",
    "Increase Facebook Ads Budget",
]

EXPLANATIONS = [
    "Customers frequently purchase these products together.",
    "Increase conversion during weekends.",
    "Prevent stock-outs of best-selling products.",
    "Boost average order value with cross-selling.",
    "Promote premium products for higher margins.",
    "Seasonal campaigns improve customer engagement.",
]

ACTIONS = [
    "bundle",
    "campaign",
    "pricing",
    "inventory",
    "cross_sell",
    "upsell",
]

STATUS = [
    "pending",
    "approved",
    "completed",
]


def seed_recommendations(
    db: Session,
    merchant_id,
    count: int = 20,
):

    existing = (
        db.query(AIRecommendation)
        .filter(
            AIRecommendation.merchant_id == merchant_id
        )
        .count()
    )

    if existing >= count:
        print("✓ Recommendations already seeded")
        return

    recommendations = []

    for i in range(count):

        recommendation = AIRecommendation(
            merchant_id=merchant_id,
            action_id=f"AI-{1000+i}",
            title=choice(TITLES),
            explanation=choice(EXPLANATIONS),
            action_type=choice(ACTIONS),
            expected_revenue=Decimal(randint(5000, 150000)),
            confidence=randint(75, 99),
            risk_level=choice(
                [
                    "low",
                    "medium",
                    "high",
                ]
            ),
            requires_approval=choice(
                [
                    True,
                    False,
                ]
            ),
            status=choice(STATUS),
        )

        recommendations.append(
            recommendation
        )

    db.add_all(recommendations)
    db.commit()

    print(f"✓ Seeded {count} recommendations")