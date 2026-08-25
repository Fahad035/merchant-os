import uuid

from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import ForeignKey
from sqlalchemy import Text
from sqlalchemy import Boolean

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    merchant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("merchants.id")
    )

    title: Mapped[str] = mapped_column(
        String(200)
    )

    description: Mapped[str] = mapped_column(
        Text()
    )

    audience: Mapped[str] = mapped_column(
        String(120)
    )

    discount_percentage: Mapped[int] = mapped_column(
        Integer
    )

    expected_revenue: Mapped[float] = mapped_column(
        Numeric(12, 2)
    )

    confidence: Mapped[int] = mapped_column(
        Integer
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Draft",
    )

    requires_approval: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    merchant = relationship("Merchant")