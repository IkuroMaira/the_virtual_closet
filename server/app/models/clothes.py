from enum import Enum
from sqlmodel import SQLModel, Field
from datetime import datetime 

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

class CategoryEnum(str, Enum):
    tops = "Tops"
    shirts = "Chemises"
    blouses = "Blouses"
    trousers = "Pantalons"
    skirts = "Jupes"
    shorts = "Shorts"
    dress = "Robes"
    jacket = "Vestes"
    coat = "Manteaux"
    trench = "Trenchs"
    sweater = "Pulls"
    cardigan = "Cardigans"
    body = "Body"
    tshirt = "T-shirt"
    blazer = "Blazers"
    vest = "Gilet"
    headwear = "Couvre-chef"
    shoes = "Chaussures"
    bags = "Sacs"
    underwear = "Sous-vêtements"
    accessories = "Accessoires"
    swimwear = "Maillots de bains"


class SizeEnum(str, Enum):
    XS = "XS"
    S = "S"
    M = "M"
    L = "L"
    XL = "XL"
    XXL = "XXL"
    XXXL = "3XL"
    XXXXL = "4XL"


class StatusEnum(str, Enum):
    clean = "Propre"
    dirty = "Sale"


class StyleEnum(str, Enum):
    boheme = "Bohème"
    vintage = "Vintage"
    classique = "Classique"
    casual = "Casual"
    streetwear = "Streetwear"
    chic = "Chic"


class SeasonEnum(str, Enum):
    spring = "Printemps"
    summer = "Été"
    autumn  = "Automne"
    winter  = "Hiver"


class NoteEnum(int, Enum):
    one = 1
    two = 2
    three = 3
    four = 4
    five = 5
    six = 6
    seven = 7
    eight = 8
    nine = 9
    ten = 10


class ColorEnum(str, Enum):
    black = "Noir"
    white = "Blanc"
    grey = "Gris"
    beige = "Beige"
    pink = "Rose"
    purple = "Violet"
    blue = "Bleu"
    green = "Vert"
    orange = "Orange"
    red = "Rouge"
    yellow = "Jaune"
    brown = "Marron"


class MaterialsEnum(str, Enum):
    cotton = "Coton"
    linen = "Lin"
    leather = "Cuir"
    wool = "Laine"
    viscose = "Viscose"
    spandex = "Élasthanne"
    polyester = "Polyester"
    lyocell = "Lyocell"
    silk = "Soie"
    cashmere = "Cachemire"
    acrylic = "Acrylique"
    polyamide = "Polyamide"
    

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