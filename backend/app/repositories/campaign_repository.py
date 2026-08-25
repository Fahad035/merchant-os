from sqlalchemy.orm import Session

from app.models.campaign import Campaign


class CampaignRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return (
            self.db.query(Campaign)
            .order_by(Campaign.title)
            .all()
        )

    def create(
        self,
        campaign: Campaign,
    ):
        self.db.add(campaign)

        self.db.commit()

        self.db.refresh(campaign)

        return campaign

    def running(self):
        return (
            self.db.query(Campaign)
            .filter(
                Campaign.status == "Running"
            )
            .all()
        )

    def drafts(self):
        return (
            self.db.query(Campaign)
            .filter(
                Campaign.status == "Draft"
            )
            .all()
        )