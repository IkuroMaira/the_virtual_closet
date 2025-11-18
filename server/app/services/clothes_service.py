from supabase import Client
from app.models import clothes
import logging

logger = logging.getLogger(__name__)

# ============================================
# SERVICE FUNCTIONS
# ============================================

def create_item(clothe_data: clothes.Clothe, supabase: Client):
    """
    Create a new clothing item in the database

    Args:
        supabase (Client): Connected Supabase Client
        clothe_data (Clothe): Clothing item data to insert

    Returns:
        dict: Created clothing item data

    Raises:
        Exception: If error during insertion
    """
    try:
        clothe_dict = clothe_data.model_dump()
        response = supabase.table('clothes').insert(clothe_dict).execute()
        return response.data
    except Exception as e:
        logger.error(f"Erreur Supabase lors de l'insertion: {str(e)}")
        raise Exception("Erreur lors de la création du vêtement")
    

def get_all_clothes(supabase: Client):
    """
    Get all clothes from the database
    """
    try:
        response = supabase.table('clothes').select("*").execute()
        return response.data
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la récupération du catalogue: {str(e)}")
        raise Exception("Erreur lors de la récupération des vêtements")


def get_item(supabase: Client, item_id: int):
    """
    Retrieve a single clothing item by its ID

    Args:
        supabase (Client): Connected Supabase Client
        item_id (int): ID of the clothing item

    Returns:
        dict: Clothing item data or None if not found

    Raises:
        Exception: If error during retrieval
    """
    try:
        response = supabase.table('clothes').select("*").eq('id', item_id).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la récupération du vêtement: {str(e)}")
        raise Exception("Erreur lors de la récupération du vêtement")
    

def update_item(clothe_data: clothes.Clothe, supabase: Client, item_id: int):
    """
    Updating a piece of clothe

    Args:
        supabase (Client): Connected Supabase Client
        item_id (int): ID of the clothing item

    Returns:
        dict: Clothing item data or None if not found

    Raises:
        Exception: If error during updating
    """
    try:
        clothe_dict = clothe_data.model_dump()
        response = supabase.table('clothes').update(clothe_dict).eq('id', item_id).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la modification: {str(e)}")
        raise Exception("Erreur lors de la mise à jour du vêtement")
    

def delete_item(supabase: Client, item_id: int):
    """
    Deleting a piece of clothe

    Args:
        supabase (Client): Connected Supabase Client
        item_id (int): ID of the clothing item

    Returns:
        string: Message

    Raises:
        Exception: If error during deletion
    """
    try:
        response = supabase.table('clothes').delete().eq('id', item_id).execute()
        return {'Item supprimé avec succès': response}
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la suppression du vêtement: {str(e)}")
        raise Exception("Erreur lors de la suppression du vêtement")