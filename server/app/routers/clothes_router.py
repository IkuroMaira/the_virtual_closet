from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
""" from app.db.database import get_supabase """
from app.repository import clothes_repository
from app.models import clothes

router = APIRouter(
    prefix="/clothes",
    tags=["Clothes"]
)

@router.post("/new_clothe")
def create_item(item: clothes.Clothe, supabase: Client = Depends(get_supabase)):
    """
    Create a new clothe
    """
    try:
        new_item = clothes_repository.create_item(item, supabase)
        return {"item": new_item}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Impossible d'insérer le vêtement")
    

@router.get("/")
def get_all_clothes(supabase: Client = Depends(get_supabase)):
    """
    Get all clothes from the wardrobe
    """
    try:
        clothes = clothes_repository.get_all_clothes(supabase)
        return {"clothes": clothes}
    except Exception:
        raise HTTPException(status_code=404, detail="Impossible de récupérer les vêtements du catalogue")
    

@router.get("/{item_id}")
def get_item(item_id: int, supabase: Client = Depends(get_supabase)):
    """
    Get a clothe
    """
    try:
        clothe = clothes_repository.get_item(supabase, item_id)
        return {"clothe": clothe}
    except Exception:
        raise HTTPException(status_code=404, detail="Impossible de trouver le vêtement")

    
@router.put("/{item_id}/update")
def update_item(item_id: int, item: clothes.Clothe, supabase: Client = Depends(get_supabase)):
    """
    Update a piece of clothe
    """
    try:
        updated_item = clothes_repository.update_item(item, supabase, item_id)
        return  {"updated_item": updated_item}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de mettre à jour le vêtement")
    

@router.delete("/{item_id}/delete")
def delete_item(item_id: int, supabase: Client = Depends(get_supabase)):
    """
    Delete a piece of clothe
    """
    try:
        deleted_item = clothes_repository.delete_item(supabase, item_id)
        return  {"deleted_item": deleted_item}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de supprimer le vêtement")