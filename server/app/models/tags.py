from sqlmodel import Field, SQLModel
from datetime import datetime 

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

class TagCreate(SQLModel):
    name: str
    color: str 
    created_at : datetime = Field(default_factory=datetime.now)
    by_default : bool = True
    user_id : int | None = None


""" TO DO : réfléchir champ obligatoire ou optionnel """
class Tags(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    color: str 
    created_at : datetime = Field(default_factory=datetime.now)
    by_default : bool = True
    user_id : int | None = Field(default=None, foreign_key="users.id")


class TagPublic(SQLModel):
    id: int 
    name: str
    color: str 
    created_at : datetime 
    by_default : bool 
    user_id : int | None 


class TagUpdate(SQLModel):
    name: str | None = None
    color: str | None = None
    by_default : bool | None = None
    user_id : int | None = None