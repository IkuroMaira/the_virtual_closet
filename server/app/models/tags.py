import uuid
from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlmodel import Field, SQLModel
from datetime import datetime

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================


class TagCreate(SQLModel):
    name: str
    color: str
    created_at: datetime = Field(default_factory=datetime.now)
    by_default: bool = True


class Tags(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    color: str
    created_at: datetime = Field(default_factory=datetime.now)
    by_default: bool = True
    user_id: uuid.UUID | None = Field(default=None, sa_column=Column(PG_UUID(as_uuid=True), nullable=True))


class TagPublic(SQLModel):
    id: int
    name: str
    color: str
    created_at: datetime
    by_default: bool
    user_id: uuid.UUID | None


class TagUpdate(SQLModel):
    name: str | None = None
    color: str | None = None
    by_default: bool | None = None
