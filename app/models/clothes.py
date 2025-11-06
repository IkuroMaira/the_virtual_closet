from pydantic import BaseModel, Field

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

class ClothesCreate(BaseModel):
    name: str = Field(min_length=2,max_length=20)
