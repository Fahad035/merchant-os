from app.services.actions.base_action import BaseAction


class PricingAction(BaseAction):

    def execute(self, recommendation):

        recommendation.status = "approved"

        self.db.commit()

        return {
            "success": True,
            "message": "Pricing action executed.",
        }