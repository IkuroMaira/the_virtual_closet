from sqlmodel import Session, select
from app.models.tags import Tags
from app.models.tags_clothes import Tags_Clothes
import logging

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
        statement = (select(Tags).join(Tags_Clothes, Tags.id == Tags_Clothes.tag_id).where(Tags_Clothes.clothe_id == item_id))
        tags = session.exec(statement).all()
        return tags

    except Exception as e:
        logger.error(f"Erreur lors de la récupération des tags du vêtement: {str(e)}")
        raise Exception("Erreur lors de la récupération des tags du vêtement")
    
