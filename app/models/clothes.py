from pydantic import BaseModel, Field

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

class ClotheCreate(BaseModel):
    """     name: str = Field(min_length=2,max_length=20) """
    name: str = Field(min_length=0,max_length=20)
