from supabase import Client
from app.models import tags
import logging
from sqlmodel import Session

logger = logging.getLogger(__name__)

# ============================================
# SERVICE FUNCTIONS
# ============================================

def create_tag(tag: tags.TagCreate, session: Session):
    """
    Create a new tag in the database

    Args:
        supabase (Client): Connected Supabase client
        tag (Clothe):  Tag data to insert

    Returns:
        dict: Created tag item data

    Raises:
        Exception: If error during insertion
    """
    try:
        """ tag_dict = tag.model_dump()
        response = supabase.table('tags').insert(tag_dict).execute()
        return response.data """
        tag_db = tags.Tags.model_validate(tag.model_dump())
        session.add(tag_db)
        session.commit()
        session.refresh(tag_db)
        return tag_db
    except Exception as e:
        logger.error(f"Erreur Supabase lors de l'insertion du tag en BD: {str(e)}")
        raise Exception("Erreur lors de la création du tag")
    

def get_all_tags(supabase: Client):
    """
    Get all tags from the database
    """
    try:
        response = supabase.table('tags').select("*").execute()
        return response.data
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la récupération des tags: {str(e)}")
        raise Exception("Erreur lors de la récupération des tags")    
    

def get_tag(supabase: Client, tag_id: int):
    """
    Retrieve a tag by its ID

    Args:
        supabase (Client): Connected Supabase client
        tag_id (int): ID of the tag 

    Returns:
        dict: Tag data or None if not found

    Raises:
        Exception: If error during retrieval
    """
    try:
        response = supabase.table('tags').select("*").eq('id', tag_id).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la récupération du tag: {str(e)}")
        raise Exception("Erreur lors de la récupération du tag")    
    

def update_tag(tag: tags.Tag, supabase: Client, tag_id: int):
    """ 
    Updating a tag

    Args:
        tag : Tag data to update
        supabase (Client): Connected Supabase client
        tag_id (int): ID of tag
    Returns:
        

    Raises:
        Exception: If error during updating
    """
    try:
        tag_dict = tag.model_dump()
        response = supabase.table('tags').update(tag_dict).eq('id', tag_id).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la modification du tag: {str(e)}")
        raise Exception("Erreur lors de la mise à jour du tag")
    

def delete_tag(supabase: Client, tag_id: int):
    """ 
    Deleting a tag

    Args:
        supabase (Client): Connected Supabase client
        tag_id (int): ID of the tag

    Returns:
        string: Message

    Raises:
        Exception: If error during deletion
    """
    try:
        response = supabase.table('tags').delete().eq('id', tag_id).execute()
        return {'Tag supprimé avec succès': response}
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la suppression du tag: {str(e)}")
        raise Exception("Erreur lors de la suppression du tag")    
    
