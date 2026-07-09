"""unique name per user instead of globally

Revision ID: 9dccc10e01fe
Revises: b3c7f2d9a1e4
Create Date: 2026-06-17 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op

revision: str = '9dccc10e01fe'
down_revision: Union[str, Sequence[str], None] = 'b3c7f2d9a1e4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_constraint('clothes_name_key', 'clothes', type_='unique')
    op.create_unique_constraint('uq_clothes_name_user', 'clothes', ['name', 'user_id'])


def downgrade() -> None:
    op.drop_constraint('uq_clothes_name_user', 'clothes', type_='unique')
    op.create_unique_constraint('clothes_name_key', 'clothes', ['name'])
