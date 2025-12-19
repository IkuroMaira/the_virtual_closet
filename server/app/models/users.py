from sqlmodel import Field, SQLModel

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================


class Users(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)