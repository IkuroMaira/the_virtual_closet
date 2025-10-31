from supabase import Client
from pydantic import BaseModel, Field

# ============================================
# PYDANTIC SCHEMAS (Models)
# ============================================

# Pour la création

# ============================================
# SERVICE FUNCTIONS
# ============================================

class ClothesCreate(BaseModel):
    name: str = Field(min_length=2,max_length=20)

# async def get_clothes(supabase: Client = Depends(get_supabase)):
#     """Récupère tous les vêtements de l'utilisateur"""
#     try:
#         response = supabase.table('clothes').select("*").execute()
#         return {"clothes": response.data}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

async def get_all_clothes(supabase: Client):
    """
    Récupère tous les vêtements de la base de données
    """
    try:
        response = supabase.table('clothes').select("*").execute()
        return response.data
    except Exception as e:
        raise Exception(f"Erreur lors de la récupération des vêtements: {str(e)}")

async def get_item(supabase: Client, item_id: int):
    """
    Retrieve a single clothing item by its ID

    Args:
        supabase (Client): Connected Supabase client
        item_id (int): ID of the clothing item

    Returns:
        dict: Clothing item data or None if not found

    Raises:
        Exception: If error during retrieval
    """
    try:
        # Execute SELECT * FROM clothes WHERE id = item_id
        response = supabase.table('clothes').select("*").eq('id', item_id).execute()
        return response.data
    except Exception as e:
        raise Exception(f"Erreur lors de la récupération du vêtement: {str(e)}")
