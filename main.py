from typing import Union
from fastapi import FastAPI
from fastapi import APIRouter, Depends
from supabase import Client
from app.db.database import get_supabase

app = FastAPI()
router = APIRouter()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/clothes")
async def get_clothes(supabase: Client = Depends(get_supabase)):
    """Récupère tous les vêtements de l'utilisateur"""
    try:
        response = supabase.table('clothes').select("*").execute()
        return {"clothes": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users")
async def get_users(supabase: Client = Depends(get_supabase)):
    """Récupère tous les utilisateurs"""
    try:
        response = supabase.table('users').select("*").execute()
        return {"users": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
