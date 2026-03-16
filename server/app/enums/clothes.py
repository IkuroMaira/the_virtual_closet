from enum import Enum

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
    autumn = "Automne"
    winter = "Hiver"

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