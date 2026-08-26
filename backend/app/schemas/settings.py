from pydantic import BaseModel


class SettingsResponse(BaseModel):
    merchant_name: str
    email: str
    phone: str
    gst_number: str

    store_name: str
    industry: str
    address: str
    currency: str
    timezone: str

    ai_recommendations: bool
    auto_bundle_detection: bool
    campaign_suggestions: bool
    checkout_ai: bool
    planner_agent: bool

    email_notifications: bool
    sms_notifications: bool
    browser_notifications: bool

    theme: str
    compact_mode: bool
    animations: bool

    two_factor_auth: bool
    session_timeout: int
    api_key: str


class SettingsUpdate(BaseModel):
    merchant_name: str
    email: str
    phone: str
    gst_number: str

    store_name: str
    industry: str
    address: str
    currency: str
    timezone: str

    ai_recommendations: bool
    auto_bundle_detection: bool
    campaign_suggestions: bool
    checkout_ai: bool
    planner_agent: bool

    email_notifications: bool
    sms_notifications: bool
    browser_notifications: bool

    theme: str
    compact_mode: bool
    animations: bool

    two_factor_auth: bool
    session_timeout: int
    api_key: str