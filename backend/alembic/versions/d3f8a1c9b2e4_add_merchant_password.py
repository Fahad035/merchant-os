"""add merchant hashed_password

Revision ID: d3f8a1c9b2e4
Revises: cf41b7ab35a9
Create Date: 2026-08-31 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd3f8a1c9b2e4'
down_revision: Union[str, None] = 'cf41b7ab35a9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'merchants',
        sa.Column('hashed_password', sa.String(length=255), nullable=True),
    )


def downgrade() -> None:
    op.drop_column('merchants', 'hashed_password')