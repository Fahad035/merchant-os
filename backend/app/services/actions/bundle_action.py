from app.services.actions.base_action import BaseAction


class BundleAction(BaseAction):

    def execute(self, recommendation):

        return {
            "success": True,
            "message": "Bundle suggestion has been generated.",
        }