""" from pydantic import BaseModel, Field """
from sqlmodel import Field, SQLModel
""" from datetime import datetime """

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

""" 
    class Tag(BaseModel):
    id: int = Field(...)
    name: str = Field(min_length=2,max_length=20)
    color: str 
"""

class TagCreate(SQLModel):
    name: str
    color: str 
    """  
        created_at : datetime = Field(default_factory=datetime.now)
        by_default : bool = True
        user_id : int | None = Field(default=None, foreign_key="users.id") 
    """

""" TO DO : réfléchir champ obligatoire ou optionnel """
class Tags(TagCreate, table=True):
    id: int | None = Field(default=None, primary_key=True)

class TagPublic(TagCreate):
    id: int 