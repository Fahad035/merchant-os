from sqlalchemy.orm import Session

from app.repositories.campaign_repository import (
    CampaignRepository,
)


class CampaignService:

    def __init__(self, db: Session):

        self.repository = CampaignRepository(
            db
        )

    def list_campaigns(self):

        campaigns = (
            self.repository.get_all()
        )

        return {
            "campaigns": campaigns,
            "total": len(campaigns),
        }

    def running(self):
        return (
            self.repository.running()
        )

    def drafts(self):
        return (
            self.repository.drafts()
        )