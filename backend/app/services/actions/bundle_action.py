from app.services.actions.base_action import BaseAction


class BundleAction(BaseAction):

    def execute(self, recommendation):

        recommendation.status = "approved"

        self.db.commit()

        return {
            "success": True,
            "message": "Bundle recommendation executed.",
        }