from app.models.campaign import Campaign
from app.services.actions.base_action import BaseAction


class CampaignAction(BaseAction):

    def execute(self, recommendation):

        campaign = Campaign(

            merchant_id=recommendation.merchant_id,

            title=recommendation.title,

            description=recommendation.explanation,

            audience="All Customers",

            discount_percentage=10,

            expected_revenue=recommendation.expected_revenue,

            confidence=recommendation.confidence,

            status="Draft",

            requires_approval=False,
        )

        self.db.add(campaign)

        self.db.commit()

        return {
            "success": True,
            "message": "Campaign created successfully.",
        }