from app.services.actions.bundle_action import BundleAction
from app.services.actions.campaign_action import CampaignAction
from app.services.actions.inventory_action import InventoryAction
from app.services.actions.pricing_action import PricingAction


class ActionFactory:

    @staticmethod
    def create(action_type, db):

        mapping = {
            "bundle": BundleAction,
            "campaign": CampaignAction,
            "pricing": PricingAction,
            "inventory": InventoryAction,
            "cross_sell": BundleAction,
        }

        action = mapping.get(action_type)

        if action is None:
            raise ValueError(
                f"Unsupported action type: {action_type}"
            )

        return action(db)