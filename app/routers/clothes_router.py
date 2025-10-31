from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.db.database import get_supabase
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
        clothes = await clothes.get_all_clothes(supabase)
        return {"clothes": clothes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{item_id}")
async def get_item(supabase: Client, item_id: int):
    try:
        response = supabase.table('clothes').select("*").eq('id', item_id).execute()

        # Check if found
        if response.data and len(response.data) > 0:
            return response.data[0]  # Return the item
        else:
            return None  # Not found

    except Exception as e:
        raise Exception(f"Erreur lors de la récupération du vêtement: {str(e)}")
