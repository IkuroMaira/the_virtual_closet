from sqlmodel import Session, select
from app.models.tags import Tags, TagPublic
from app.models.tags_clothes import Tags_Clothes
from app.models.clothes import Clothes
import logging
from sqlalchemy import func

logger = logging.getLogger(__name__)

def get_all_tags_from_item(session: Session, item_id: int) -> list[Tags]:
    """     
    Get all tags for a piece of clothe
    
    Args:
        session (Session): SQLModel session connected to the database
        item_id (int): ID of the clothing item

    Returns:
        List: Tags object assigned to a piece of clothe

    Raises: 
        Exception: If error during retrieval
    """
    try:
        clothe = session.get(Clothes, item_id)
        if not clothe:
            raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")
        statement = (select(Tags).join(Tags_Clothes, Tags.id == Tags_Clothes.tag_id).where(Tags_Clothes.clothe_id == item_id))
        tags = session.exec(statement).all()
        return tags

    except Exception as e:
        logger.error(f"Erreur lors de la récupération des tags du vêtement: {str(e)}")
        raise Exception("Erreur lors de la récupération des tags du vêtement")
    

def add_tag_to_item(item_id: int, session: Session, tag_id: int, user_id:int) -> Tags_Clothes:
    """ 
    Assign a tag to an item

    Args:

    Returns:

    Raises:

    """
    try:
        clothe = session.get(Clothes, item_id)
        if not clothe:
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
            user_id=user_id  #  gérer dans l'Epic 3
        )
            
        session.add(new_relation)
        session.commit()
        session.refresh(new_relation)
    
        return new_relation
    except Exception as e:
        logger.error(f"Erreur lors de l'assignation du tag au vêtement: {str(e)}")
        raise Exception("Erreur lors de l'assignation du tag au vêtement:")
    

def remove_tag_from_item(session: Session, item_id: int, tag_id: int) -> Tags_Clothes:
    """ 
    Delete a tag assigned to an item
     
    Args:
    
     
    Returns:
     
    Raises: 
    """
    try:
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
    except Exception as e:
        logger.error(f"Erreur lors de la suppression de l'association du tag au vêtement: {str(e)}")
        raise Exception("Erreur lors de la suppression de l'association du tag au vêtement:")