from app.models.tags import Tags, TagCreate, TagPublic, TagUpdate
from app.models.users import Users
import logging
from sqlmodel import Session, select, SQLModel

logger = logging.getLogger(__name__)

# ============================================
# SERVICE FUNCTIONS
# ============================================

def add_tag(tag: TagCreate, session: Session) -> TagPublic:
    """
    Add a new tag 

    Args:
        tag (TagCreate):  Tag data to insert
        session (Session): SQLModel session connected to the database

    Returns:
        dict: Created tag item data

    Raises:
        Exception: If error during insertion
    """
    try:
        tag_db = Tags.model_validate(tag.model_dump())
        session.add(tag_db)
        session.commit()
        session.refresh(tag_db)
        return TagPublic.model_validate(tag_db)
    except Exception as e:
        logger.error(f"Erreur lors de l'insertion du tag en BD: {str(e)}")
        raise Exception("Erreur lors de la création du tag")
    

def get_all_tags(session: Session) -> list[TagPublic]:
    """
    Get all tags from the database

    Args:
        session (Session): SQLModel session connected to the database

    Returns:
        list: All tags

    Raises:
        Exception: If error during retrieval 
    """
    try:
        statement = select(Tags)
        """ 
        Pourquoi .all() ?
        Parce que session.exec() renvoie un Result qui doit être converti en liste. 
        """
        tags = session.exec(statement).all()
        return [TagPublic.model_validate(tag) for tag in tags]
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des tags: {str(e)}")
        raise Exception("Erreur lors de la récupération des tags")    
    

def get_tag(tag_id: int, session: Session) -> TagPublic | None:
    """     
    Retrieve a tag by its ID

    Args:
        tag_id (int): ID of the tag 
        session (Session): SQLModel session connected to the database

    Returns:
        dict: Tag data or None if not found

    Raises:
        Exception: If error during retrieval
    """
    try:
        statement = select(Tags).where(Tags.id == tag_id)
        tag = session.exec(statement).first()
        return TagPublic.model_validate(tag)
    except Exception as e:
        logger.error(f"Erreur lors de la récupération du tag: {str(e)}")
        raise Exception("Erreur lors de la récupération du tag")    
    

def update_tag(tag_id: int, tag_updated: TagUpdate, session: Session) -> TagPublic:
    """      
    Updating a tag

    Args:
        tag_id (int): ID of tag
        tag_updated (TagUpdate) : Tag data to update
        session (Session): SQLModel session connected to the database

    Returns:
        TagPublic object: Updated tag data

    Raises:
        Exception: If error during updating
    """
    try:
        tag = session.get(Tags, tag_id)
        tag_update = tag_updated.model_dump(exclude_unset=True)
        tag.sqlmodel_update(tag_update)
        session.add(tag)
        session.commit()
        session.refresh(tag)
        return  TagPublic.model_validate(tag)
    except Exception as e:
        logger.error(f"Erreur lors de la modification du tag: {str(e)}")
        raise Exception("Erreur lors de la mise à jour du tag")
     

def delete_tag(session: Session, tag_id: int) -> TagPublic:
    """
    Deleting a tag

    Args:
        session (Session): SQLModel session connected to the database
        tag_id (int): ID of the tag

    Returns:
       TagPublic object: The deleted tag data
       
    Raises:
        Exception: If error during deletion
    """
    try:
        statement = select(Tags).where(Tags.id == tag_id)
        tag = session.exec(statement).one()
        public_tag = TagPublic.model_validate(tag)
        session.delete(tag)
        session.commit()
        return public_tag
    except Exception as e:
        logger.error(f"Erreur lors de la suppression du tag: {str(e)}")
        raise Exception("Erreur lors de la suppression du tag")  
  
    
