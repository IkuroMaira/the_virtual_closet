from pydantic import BaseModel, Field

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

class Clothe(BaseModel):
    name: str = Field(min_length=2,max_length=20)

