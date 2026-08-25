from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from app.core.config import settings
from app.database.base import Base

# Import all models so Alembic can discover them
from app.models.ai_recommendation import AIRecommendation
from app.models.audit_log import AuditLog
from app.models.customer import Customer
from app.models.merchant import Merchant
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.conversation import Conversation
from app.models.message import Message

config = context.config

config.set_main_option(
    "sqlalchemy.url",
    settings.DATABASE_URL,
)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline():
    context.configure(
        url=settings.DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()