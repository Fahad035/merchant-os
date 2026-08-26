from fastapi import APIRouter

from app.schemas.settings import (
    SettingsResponse,
    SettingsUpdate,
)

from app.services.settings_service import (
    SettingsService,
)

router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)

service = SettingsService()


@router.get(
    "",
    response_model=SettingsResponse,
)
def get_settings():
    return service.get_settings()


@router.put(
    "",
    response_model=SettingsResponse,
)
def update_settings(
    settings: SettingsUpdate,
):
    return service.update_settings(settings)