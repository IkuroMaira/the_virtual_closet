from supabase import Client
from app.models.tags import Tags, TagCreate, TagPublic, TagUpdate
from app.models.users import Users
import logging
from sqlmodel import Session, select, SQLModel

logger = logging.getLogger(__name__)

# ============================================
# SERVICE FUNCTIONS
# ============================================

def create_tag(tag: TagCreate, session: Session):
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
        tag_db = Tags.model_validate(tag.model_dump())
        session.add(tag_db)
        session.commit()
        session.refresh(tag_db)
        return tag_db
    except Exception as e:
        logger.error(f"Erreur lors de l'insertion du tag en BD: {str(e)}")
        raise Exception("Erreur lors de la création du tag")
    

def get_all_tags(session: Session):
    """
    Get all tags from the database
    """
    try:
        """ response = supabase.table('tags').select("*").execute()
        return response.data """
        statement = select(Tags)
        """ 
        Pourquoi .all() ?
        Parce que session.exec() renvoie un Result qui doit être converti en liste. 
        """
        tags = session.exec(statement).all()
        return tags
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des tags: {str(e)}")
        raise Exception("Erreur lors de la récupération des tags")    
    

def get_tag(session: Session, tag_id: int):
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
        """ response = supabase.table('tags').select("*").eq('id', tag_id).execute()
        return response.data[0] """ 
        statement = select(Tags).where(Tags.id == tag_id)
        tag = session.exec(statement).first()
        return tag
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la récupération du tag: {str(e)}")
        raise Exception("Erreur lors de la récupération du tag")    
    

def update_tag(tag_updated: TagUpdate, session: Session, tag_id: int):
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
        """ tag_dict = tag.model_dump()
        response = supabase.table('tags').update(tag_dict).eq('id', tag_id).execute()
        return response.data[0] """
        """         statement = select(Tags).where(Tags.id == tag_id)
        tag = session.exec(statement).first()

        tag_data = tag_updated.model_dump(exclude_unset=True)
        for key, value in tag_data.items():
            setattr(tag, key, value) """
        tag = session.get(Tags, tag_id)
        tag_update = tag_updated.model_dump(exclude_unset=True)
        tag.sqlmodel_update(tag_update)
        session.add(tag)
        session.commit()
        session.refresh(tag)
        return tag
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la modification du tag: {str(e)}")
        raise Exception("Erreur lors de la mise à jour du tag")
     

def delete_tag(session: Session, tag_id: int):
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
        """ response = supabase.table('tags').delete().eq('id', tag_id).execute()
        return {'Tag supprimé avec succès': response} """
        statement = select(Tags).where(Tags.id == tag_id)
        tag = session.exec(statement).one()
        session.delete(tag)
        session.commit()
        return tag
    except Exception as e:
        logger.error(f"Erreur Supabase lors de la suppression du tag: {str(e)}")
        raise Exception("Erreur lors de la suppression du tag")  
  
    
