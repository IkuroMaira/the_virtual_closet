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
        ValueError: If tag name already exist
    """
    existing = session.exec(
        select(Tags)
        .where(Tags.name == tag.name)
    ).first()

    if existing:
        raise ValueError(f"Un tag nommé '{tag.name}' existe déjà")
    
    tag_db = Tags.model_validate(tag.model_dump())
    session.add(tag_db)
    session.commit()
    session.refresh(tag_db)

    return TagPublic.model_validate(tag_db)

    
def get_all_tags(session: Session) -> list[TagPublic]:
    """
    Get all tags from the database

    Args:
        session (Session): SQLModel session connected to the database

    Returns:
        list: All tags (empty list if none) 
    """
    statement = select(Tags)
    tags = session.exec(statement).all()
    """ 
    Pourquoi .all() ?
    Parce que session.exec() renvoie un Result qui doit être converti en liste. 
    """

    return [TagPublic.model_validate(tag) for tag in tags]
    
    
def get_tag(tag_id: int, session: Session) -> TagPublic:
    """     
    Retrieve a tag by its ID

    Args:
        tag_id (int): ID of the tag 
        session (Session): SQLModel session connected to the database

    Returns:
        dict: Tag data

    Raises:
        ValueError: If tag doesn't exist
    """
    statement = select(Tags).where(Tags.id == tag_id)
    tag = session.exec(statement).first()

    if not tag:
        raise ValueError(f"Le tag avec l'ID {tag_id} n'existe pas")

    return TagPublic.model_validate(tag)
      

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
        ValueError: If tag doesn't exist or name already exists
    """
    tag = session.get(Tags, tag_id)

    if not tag:
        raise ValueError(f"Le tag avec l'ID {tag_id} n'existe pas")
    
    if tag_updated.name and tag_updated.name != tag.name:
        existing = session.exec(
            select(Tags)
            .where(Tags.name == tag_updated.name)
        ).first()
        if existing:
            raise ValueError(f"Un tag nommé '{tag_updated.name}' existe déjà")

    tag_update = tag_updated.model_dump(exclude_unset=True)
    tag.sqlmodel_update(tag_update)
    session.add(tag)
    session.commit()
    session.refresh(tag)

    return  TagPublic.model_validate(tag)
     

def delete_tag(tag_id: int, session: Session) -> TagPublic:
    """
    Deleting a tag

    Args:
        session (Session): SQLModel session connected to the database
        tag_id (int): ID of the tag

    Returns:
       TagPublic object: The deleted tag data
       
    Raises:
         ValueError: If tag doesn't exist 
    """
    statement = select(Tags).where(Tags.id == tag_id)
    tag = session.exec(statement).first()
    
    if not tag:
        raise ValueError(f"Le tag avec l'ID {tag_id} n'existe pas")
    
    public_tag = TagPublic.model_validate(tag)
    session.delete(tag)
    session.commit()

    return public_tag

  
    
