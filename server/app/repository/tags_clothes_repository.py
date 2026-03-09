from sqlmodel import Session, select
from app.models.tags import Tags, TagPublic
from app.models.tags_clothes import Tags_Clothes
from app.models.clothes import Clothes
import logging
from sqlalchemy import func

logger = logging.getLogger(__name__)

def get_all_tags_from_item(item_id: int, session: Session) -> list[Tags]:
    """     
    Get all tags for a piece of clothing
    
    Args:
        item_id (int): ID of the clothing item
        session (Session): SQLModel session connected to the database

    Returns:
        List: Tags object assigned to a piece of clothing (empty list if no tags)
    
    Raises: 
        ValueError: If item doesn't exist
    """
    item = session.get(Clothes, item_id)
    if not item:
        raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")
    statement = (
        select(Tags)
        .join(Tags_Clothes, Tags.id == Tags_Clothes.tag_id)
        .where(Tags_Clothes.clothe_id == item_id))
    tags = session.exec(statement).all()
    return tags
    

def add_tag_to_item(item_id: int, tag_id: int, user_id:int, session: Session) -> Tags_Clothes:
    """ 
    Assign a tag to an item

    Args:
        item_id (int): ID of the clothing item
        tag_id: ID of the tag
        user_id: Id of the user (user_id:2 by default)
        session (Session): SQLModel session connected to the database

    Returns:
        Tag_Clothes: the association between a tag and a piece of clothing

    Raises:
        ValueError: If item/tag doesn't exist, or if an association exists already
    """
    item = session.get(Clothes, item_id)
    if not item:
        raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")
        
    tag = session.get(Tags, tag_id)
    if not tag:
        raise ValueError(f"Le tag avec l'ID {tag_id} n'existe pas")
    
    existing_relation = session.exec(
        select(Tags_Clothes)
        .where(Tags_Clothes.clothe_id == item_id)
        .where(Tags_Clothes.tag_id == tag_id)
    ).first()
    
    if existing_relation:
        raise ValueError(f"Le tag est déjà assigné à ce vêtement")
        
    current_tags_count = session.exec(
        select(func.count(Tags_Clothes.id))
        .where(Tags_Clothes.clothe_id == item_id)
    ).one()
    
    if current_tags_count >= 10:
        raise ValueError(f"Le vêtement a déjà 10 tags (maximum atteint)")
    
    new_relation = Tags_Clothes(
        clothe_id=item_id,
        tag_id=tag_id,
        user_id=user_id  # à gérer dans l'Epic 3
    )
            
    session.add(new_relation)
    session.commit()
    session.refresh(new_relation)
    
    return new_relation
    

def remove_tag_from_item(item_id: int, tag_id: int, session: Session) -> Tags_Clothes:
    """ 
    Delete a tag assigned to an item
     
    Args:
        item_id (int): ID of the clothing item
        tag_id: Id of the tag
        session (Session): SQLModel session connected to the database
     
    Returns:
        Tag_Clothes: the deleted relation between a tag and a piece of clothing

    Raises:
        ValueError: If relation doesn't exist
    """
    relation = session.exec(
        select(Tags_Clothes)
        .where(Tags_Clothes.clothe_id == item_id)
        .where(Tags_Clothes.tag_id == tag_id)
    ).first()

    if not relation:
        raise ValueError(f"Le tag {tag_id} n'est pas assigné au vêtement {item_id}")

    deleted_relation = Tags_Clothes(
        id=relation.id,
        clothe_id=relation.clothe_id,
        tag_id=relation.tag_id,
        user_id=relation.user_id
    )    
    session.delete(relation)
    session.commit()

    return deleted_relation