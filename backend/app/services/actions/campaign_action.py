from app.services.actions.base_action import BaseAction


class CampaignAction(BaseAction):

    def execute(self, recommendation):

        recommendation.status = "approved"

        self.db.commit()

        return {
            "success": True,
            "message": "Campaign executed successfully.",
        }