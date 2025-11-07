from supabase import Client

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

# async def create_item(supabase: Client, clothes: dict):