from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.db.database import get_supabase
from app.services import clothes_service
from app.models import clothes

router = APIRouter(
    prefix="/clothes",
    tags=["Clothes"]
)

@router.get("/")
async def get_all_clothes(supabase: Client = Depends(get_supabase)):
    """
    Get all clothes from the wardrobe
    """
    try:
        clothes = await clothes_service.get_all_clothes(supabase)
        return {"clothes": clothes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{item_id}")
async def get_item(item_id: int, supabase: Client = Depends(get_supabase)):
    """
    Get a clothe
    """
    try:
        response = supabase.table('clothes').select("*").eq('id', item_id).execute()

        # Check if found
        if response.data and len(response.data) > 0:
            return response.data[0]  # Return the item
        else:
            raise HTTPException(status_code=404, detail="Vêtement non trouvé")
    except Exception as e:
        raise Exception(f"Erreur lors de la récupération du vêtement: {str(e)}")


@router.post("/")
async def create_item(item: clothes.ClotheCreate, supabase: Client = Depends(get_supabase)):
    """
    Create a new clothe
    """
    try:
        new_item = await clothes_service.create_item(supabase, item)
        return {"item": new_item}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Impossible d'insérer le vêtement")
    

@router.delete("/{item_id}")
async def delete_item(item_id: int, supabase: Client = Depends(get_supabase)):
    """
    Delete a piece of clothe
    """
    try:
        deleted_item = await clothes_service.delete_item(supabase, item_id)
        return  {"deleted_item": deleted_item}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Impossible de supprimer le vêtement")