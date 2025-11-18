from pydantic import BaseModel, Field
from enum import Enum

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

class CategoryEnum(str, Enum):
    tops = 'Tops'
    shirts = 'Chemises'
    blouses = "Blouses"
    trousers = "Pantalons"
    skirts = "Jupes"
    shorts = "Shorts"
    dress = "Robes"
    shoes = "Chaussures"
    bags = "Sacs"
    underwear = "Sous-vêtements"
    jewellery = "Bijoux"
    swimwear = "Maillots de bains"

class Clothe(BaseModel):
    name: str = Field(min_length=2,max_length=20)
    category: CategoryEnum
