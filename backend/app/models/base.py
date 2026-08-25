from app.database.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class BaseModel(
    UUIDPrimaryKeyMixin,
    TimestampMixin,
    Base,
):
    """
    Base model inherited by every ORM model.
    """

    __abstract__ = True