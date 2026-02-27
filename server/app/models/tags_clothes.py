from sqlmodel import SQLModel, Field, UniqueConstraint

class Tags_Clothes(SQLModel, table=True):
    __table_args__ = (UniqueConstraint("clothe_id", "tag_id"),)

    id: int | None = Field(default=None, primary_key=True)
    tag_id: int = Field(foreign_key="tags.id")
    clothe_id: int = Field(foreign_key="clothes.id")
    user_id: int = Field(foreign_key="users.id")
