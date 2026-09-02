from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "MerchantOS"

    DATABASE_HOST: str
    DATABASE_PORT: int

    DATABASE_NAME: str
    DATABASE_USER: str
    DATABASE_PASSWORD: str

    DATABASE_URL: str

    # -----------------------------
    # Gemini
    # -----------------------------
    GEMINI_API_KEY: str

    RAZORPAY_KEY_ID: str
    RAZORPAY_KEY_SECRET: str

    # -----------------------------
    # Auth / JWT
    # -----------------------------
    # NOTE: these have dev-friendly defaults so your .env doesn't need to
    # change right away. Override JWT_SECRET_KEY before deploying anywhere
    # reachable by others.
    JWT_SECRET_KEY: str = "dev-only-change-this-secret-key"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    COOKIE_NAME: str = "merchantos_token"
    COOKIE_SECURE: bool = False  # set True once served over HTTPS

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()