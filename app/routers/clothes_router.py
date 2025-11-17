from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.db.database import get_supabase
from app.services import clothes_service
from app.models import clothes

router = APIRouter(
    prefix="/clothes",
    tags=["Clothes"]
)

@router.post("/new_clothe")
async def create_item(item: clothes.Clothe, supabase: Client = Depends(get_supabase)):
    """
    Create a new clothe
    """
    try:
        new_item = await clothes_service.create_item(item, supabase)
        return {"item": new_item}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible d'insérer le vêtement")
    

@router.get("/")
async def get_all_clothes(supabase: Client = Depends(get_supabase)):
    """
    Get all clothes from the wardrobe
    """
    try:
        clothes = await clothes_service.get_all_clothes(supabase)
        return {"clothes": clothes}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de récupérer les vêtements du catalogue")
    

@router.get("/{item_id}")
async def get_item(item_id: int, supabase: Client = Depends(get_supabase)):
    """
    Get a clothe
    """
    try:
        clothe =  await clothes_service.get_item(supabase, item_id)
        return {"clothe": clothe}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de récupérer le vêtement")

    
@router.put("/{item_id}/update")
async def update_item(item_id: int, item: clothes.Clothe, supabase: Client = Depends(get_supabase)):
    """
    Update a piece of clothe
    """
    try:
        updated_item = await clothes_service.update_item(item, supabase, item_id)
        return  {"updated_item": updated_item}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de mettre à jour le vêtement")
    

@router.delete("/{item_id}/delete")
async def delete_item(item_id: int, supabase: Client = Depends(get_supabase)):
    """
    Delete a piece of clothe
    """
    try:
        deleted_item = await clothes_service.delete_item(supabase, item_id)
        return  {"deleted_item": deleted_item}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de supprimer le vêtement")