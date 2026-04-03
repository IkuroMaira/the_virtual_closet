from sqlmodel import SQLModel, Field
from datetime import datetime
from app.enums import (
      CategoryEnum,
      SizeEnum,
      StatusEnum,
      StyleEnum,
      SeasonEnum,
      ColorEnum,
      MaterialsEnum,
)

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

class Clothes(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    name: str = Field(max_length=50, unique=True, nullable=False)
    category: CategoryEnum = Field(nullable=False)
    color: ColorEnum = Field(nullable=False)
    size: SizeEnum | None = Field(default=None)
    status: StatusEnum | None = Field(default=StatusEnum.asset)
    style: StyleEnum | None = Field(default=None)
    season: SeasonEnum | None = Field(default=None)
    materials: MaterialsEnum | None = Field(default=None)
    note: int | None = Field(default=None, ge=1, le=5)
    comment: str | None = Field(default=None)
    picture: str | None = Field(default=None)
    brand_id: int | None = Field(default=None, foreign_key="brands.id")
    user_id: int | None = Field(default=None, foreign_key="users.id")


class ClotheCreate(SQLModel):
    name: str = Field(min_length=2, max_length=50)
    category: CategoryEnum
    color: ColorEnum
    size: SizeEnum | None = None
    status: StatusEnum | None = None
    style: StyleEnum | None = None
    season: SeasonEnum | None = None
    materials: MaterialsEnum | None = None
    note: int | None = Field(default=None, ge=1, le=5)
    comment: str | None = None
    picture: str | None = None
    brand_id: int | None = None


class ClothePublic(SQLModel):
    id: int
    created_at: datetime
    updated_at: datetime
    name: str
    category: CategoryEnum
    color: ColorEnum
    size: SizeEnum | None
    status: StatusEnum | None
    style: StyleEnum | None
    season: SeasonEnum | None
    materials: MaterialsEnum | None
    note: int | None
    comment: str | None
    picture: str | None
    brand_id: int | None
    user_id: int | None


class ClotheUpdate(SQLModel):
    name: str | None = Field(default=None, min_length=2, max_length=50)
    category: CategoryEnum | None = None
    color: ColorEnum | None = None
    size: SizeEnum | None = None
    status: StatusEnum | None = None
    style: StyleEnum | None = None
    season: SeasonEnum | None = None
    materials: MaterialsEnum | None = None
    note: int | None = Field(default=None, ge=1, le=5)
    comment: str | None = None
    picture: str | None = None
    brand_id: int | None = None