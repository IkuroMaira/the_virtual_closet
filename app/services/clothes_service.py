from supabase import Client
from app.models import clothes

# ============================================
# SERVICE FUNCTIONS
# ============================================

async def get_all_clothes(supabase: Client):
    """
    Get all clothes from the database
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

async def create_item(supabase: Client, clothe_data: clothes.ClotheCreate):
    """
    Create a new clothing item in the database

    Args:
        supabase (Client): Connected Supabase client
        clothe_data (ClotheCreate): Clothing item data to insert

    Returns:
        dict: Created clothing item data

    Raises:
        Exception: If error during insertion
    """
    try:
        # Convert Pydantic model to dict for Supabase insertion
        clothe_dict = clothe_data.model_dump()
        response = supabase.table('clothes').insert(clothe_dict).execute()
        return response.data
    except Exception as e:
        raise Exception(f"Erreur lors de l'insertion du vêtement: {str(e)}") 