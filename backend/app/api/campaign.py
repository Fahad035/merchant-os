from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.services.campaign_service import (
    CampaignService,
)

from app.schemas.campaign import (
    CampaignListResponse,
    CampaignResponse,
)

router = APIRouter(
    prefix="/campaigns",
    tags=["Campaigns"],
)


@router.get(
    "",
    response_model=CampaignListResponse,
)
def campaigns(
    db: Session = Depends(get_db),
):
    service = CampaignService(db)

    return service.list_campaigns()


@router.get(
    "/running",
    response_model=list[CampaignResponse],
)
def running(
    db: Session = Depends(get_db),
):
    return CampaignService(db).running()


@router.get(
    "/drafts",
    response_model=list[CampaignResponse],
)
def drafts(
    db: Session = Depends(get_db),
):
    return CampaignService(db).drafts()