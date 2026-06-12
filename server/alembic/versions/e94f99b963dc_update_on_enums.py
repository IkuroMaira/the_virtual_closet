"""Update on Enums

Revision ID: e94f99b963dc
Revises: 8bebce51c9a8
Create Date: 2026-05-29 20:03:29.283073

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'e94f99b963dc'
down_revision: Union[str, Sequence[str], None] = '8bebce51c9a8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("ALTER TYPE statusenum ADD VALUE 'sold'")
    op.execute("ALTER TYPE statusenum ADD VALUE 'given'")
    op.execute("ALTER TYPE statusenum ADD VALUE 'asset'")


def downgrade() -> None:
    """Downgrade schema."""
    pass
