from app.schemas.settings import SettingsUpdate


class SettingsService:

    def get_settings(self):
        return {
            "merchant_name": "John Sports",
            "email": "merchant@example.com",
            "phone": "+91 9876543210",
            "gst_number": "22AAAAA0000A1Z5",

            "store_name": "John Sports",
            "industry": "Retail",
            "address": "Bengaluru, India",
            "currency": "INR",
            "timezone": "Asia/Kolkata",

            "ai_recommendations": True,
            "auto_bundle_detection": True,
            "campaign_suggestions": True,
            "checkout_ai": True,
            "planner_agent": True,

            "email_notifications": True,
            "sms_notifications": False,
            "browser_notifications": True,

            "theme": "system",
            "compact_mode": False,
            "animations": True,

            "two_factor_auth": False,
            "session_timeout": 30,
            "api_key": "mos_live_xxxxxxxxxxxxxx",
        }

    def update_settings(
        self,
        settings: SettingsUpdate,
    ):
        return settings