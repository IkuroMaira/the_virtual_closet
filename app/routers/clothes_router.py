from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.db.database import get_supabase
from app.services import clothes_service

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
