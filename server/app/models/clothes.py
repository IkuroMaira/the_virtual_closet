from sqlmodel import SQLModel, Field
from datetime import datetime
from app.enums import (
      CategoryEnum,
      SizeEnum,
      StatusEnum,
      StyleEnum,
      SeasonEnum,
      NoteEnum,
      ColorEnum,
      MaterialsEnum,
)

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

class ClotheCreate(SQLModel):
    created_at : datetime = Field(default_factory=datetime.now)
    updated_at : datetime = Field(default_factory=datetime.now)
    category : CategoryEnum
    size : SizeEnum
    status : StatusEnum
    style : StyleEnum
    brand_id : int | None = None
    user_id : int  | None = None
    season : SeasonEnum
    note : NoteEnum
    materials : MaterialsEnum
    comment : str
    picture : str
    color : ColorEnum
    name : str


class Clothes(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at : datetime = Field(default_factory=datetime.now)
    updated_at : datetime = Field(default_factory=datetime.now)
    category : CategoryEnum
    size : SizeEnum
    status : StatusEnum
    style : StyleEnum
    brand_id : int | None = Field(default=None, foreign_key="brands.id")
    user_id : int  | None = Field(default=None, foreign_key="users.id")
    season : SeasonEnum
    note : int
    materials : MaterialsEnum
    comment : str
    picture : str
    color : ColorEnum
    name : str


class ClothePublic(SQLModel):
    id: int 
    created_at : datetime 
    updated_at : datetime 
    category : CategoryEnum
    size : SizeEnum
    status : StatusEnum
    style : StyleEnum
    brand_id : int | None 
    user_id : int  | None 
    season : SeasonEnum
    note : NoteEnum
    materials : MaterialsEnum
    comment : str
    picture : str
    color : ColorEnum
    name : str

class ClotheUpdate(SQLModel):
    created_at : datetime  | None = None
    updated_at : datetime  | None = None
    category : CategoryEnum  | None = None
    size : SizeEnum  | None = None
    status : StatusEnum  | None = None
    style : StyleEnum  | None = None
    brand_id : int | None 
    user_id : int  | None 
    season : SeasonEnum  | None = None
    note : NoteEnum  | None = None
    materials : MaterialsEnum  | None = None
    comment : str  | None = None
    picture : str  | None = None
    color : ColorEnum  | None = None
    name : str  | None = None