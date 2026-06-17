"""migrate user_id to uuid and drop users table

Revision ID: b3c7f2d9a1e4
Revises: 8bebce51c9a8
Create Date: 2026-06-17 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'b3c7f2d9a1e4'
down_revision: Union[str, Sequence[str], None] = 'e94f99b963dc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop FK constraints referencing users table
    op.drop_constraint('clothes_user_id_fkey', 'clothes', type_='foreignkey')
    op.drop_constraint('tags_user_id_fkey', 'tags', type_='foreignkey')
    op.drop_constraint('tags_clothes_user_id_fkey', 'tags_clothes', type_='foreignkey')

    # Drop users table (Supabase Auth manages users)
    op.drop_table('users')

    # Replace integer user_id with UUID in clothes
    op.drop_column('clothes', 'user_id')
    op.add_column('clothes', sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True))

    # Replace integer user_id with UUID in tags
    op.drop_column('tags', 'user_id')
    op.add_column('tags', sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True))

    # Replace integer user_id with UUID in tags_clothes
    op.drop_column('tags_clothes', 'user_id')
    op.add_column('tags_clothes', sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True))


def downgrade() -> None:
    # Not reversible — dev project, data reset expected
    pass
