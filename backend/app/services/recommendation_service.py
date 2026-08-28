from sqlalchemy.orm import Session

from app.services.bundle_recommendation import (
    BundleRecommendationEngine,
)
from app.services.cross_sell_recommendation import (
    CrossSellRecommendationEngine,
)
from app.services.inventory_recommendation import (
    InventoryRecommendationEngine,
)
from app.services.pricing_recommendation import (
    PricingRecommendationEngine,
)
from app.services.campaign_recommendation import (
    CampaignRecommendationEngine,
)


class RecommendationService:

    def __init__(self, db: Session):

        self.bundle_engine = BundleRecommendationEngine(db)

        self.cross_sell_engine = CrossSellRecommendationEngine(db)

        self.inventory_engine = InventoryRecommendationEngine(db)

        self.pricing_engine = PricingRecommendationEngine(db)

        self.campaign_engine = CampaignRecommendationEngine(db)

    def generate(self, merchant_id):

        recommendations = []

        recommendations.extend(
            self.bundle_engine.generate(
                merchant_id
            )
        )

        recommendations.extend(
            self.cross_sell_engine.generate(
                merchant_id
            )
        )

        recommendations.extend(
            self.inventory_engine.generate(
                merchant_id
            )
        )

        recommendations.extend(
            self.pricing_engine.generate(
                merchant_id
            )
        )

        recommendations.extend(
            self.campaign_engine.generate(
                merchant_id
            )
        )

        if recommendations:

            self.bundle_engine.save_all(
                recommendations
            )

        return recommendations