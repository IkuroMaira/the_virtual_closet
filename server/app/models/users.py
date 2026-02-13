from datetime import datetime

from sqlmodel import Field, SQLModel

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================


class Users(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    pseudo : str
    password: str
    email: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)