from datetime import datetime

from sqlmodel import Field, SQLModel

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================


class Brands(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name : str
    category : str | None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)