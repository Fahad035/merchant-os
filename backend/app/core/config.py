from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "MerchantOS"

    DATABASE_URL: str

    GEMINI_API_KEY: str

    RAZORPAY_KEY_ID: str
    RAZORPAY_KEY_SECRET: str

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24 * 7

    COOKIE_NAME: str = "merchantos_token"

    # Production should be True
    COOKIE_SECURE: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )



@lru_cache
def get_settings():
    return Settings()


settings = get_settings()