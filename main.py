from typing import Union
from fastapi import FastAPI
from fastapi import APIRouter, Depends
from supabase import Client
from app.database import get_supabase

app = FastAPI()
router = APIRouter()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/clothes")
def read_clothes():
    return {'Ici on affichera les vêtements'}

async def get_clothes(supabase: Client = Depends(get_supabase)):
    """Récupère tous les vêtements de l'utilisateur"""
    try:
        response = supabase.table('clothes').select("*").execute()
        return {"clothes": response.data}
    except Exception as e:
        return {"error": str(e)}
