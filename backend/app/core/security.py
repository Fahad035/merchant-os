from datetime import datetime, timedelta, timezone
from uuid import UUID

import bcrypt
import jwt

from app.core.config import settings

ALGORITHM = settings.JWT_ALGORITHM
SECRET_KEY = settings.JWT_SECRET_KEY
EXPIRE_MINUTES = settings.JWT_EXPIRE_MINUTES


def hash_password(plain_password: str) -> str:
    """Hash a plaintext password with bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(plain_password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check a plaintext password against a bcrypt hash."""
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8"),
        )
    except ValueError:
        # Malformed hash (e.g. legacy row with no password set).
        return False


def create_access_token(merchant_id: UUID) -> str:
    """Issue a signed JWT identifying the merchant, expiring per settings."""
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(merchant_id),
        "iat": now,
        "exp": now + timedelta(minutes=EXPIRE_MINUTES),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> UUID | None:
    """Return the merchant id embedded in a valid token, or None if invalid/expired."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return UUID(payload["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        return None