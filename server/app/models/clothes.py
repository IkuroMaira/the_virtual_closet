from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
from datetime import datetime

from sqlalchemy import Nullable


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


class SizeEnum(str, Enum):
    XS = "XS"
    S = "S"
    M = "M"
    L = "L"
    XL = "XL"
    XXL = "XXL"

class SeasonEnum(str, Enum):
    spring = "Printemps"
    summer = "Été"
    autumn = "Automne"
    winter = "Hiver"
    all_seasons = "Toutes saisons"

class StatusEnum(str, Enum):
    available = "Disponible"
    worn = "Porté"
    dirty = "À laver"

class ColorEnum(str, Enum):
    black = "Noir"
    white = "Blanc"
    red = "Rouge"
    blue = "Bleu"
    green = "Vert"
    yellow = "Jaune"
    orange = "Orange"
    pink = "Rose"
    grey = "Gris"

class StyleEnum(str, Enum):
    casual = "Casual"
    sportwear = "Sportwear"
    sexy = "Sexy"

class MaterialsEnum(str, Enum):
    cotton = "Coton"
    silk = "Soi"
    polyester = "Polyester"
    flax = "Lin"

# def validate_name()

class Clothe(BaseModel):
    name: str = Field(min_length=2,max_length=20)
    category: CategoryEnum
    size: Optional[SizeEnum] = None
    brand_id: Optional[int] = None # Clé étrangère
    user_id: Optional[int] = None # Clé étrangère
    season: Optional[SeasonEnum] = None
    status: Optional[StatusEnum] = None
    style: Optional[StyleEnum] = None
    note: Optional[int] = Field(default=None, ge=0, le=5)
    materials: Optional[MaterialsEnum] = None
    comment: Optional[str] = Field(default=None, min_length=2, max_length=500)
    picture: Optional[str] = Field(default=None, min_length=2,max_length=200)
    color: ColorEnum
