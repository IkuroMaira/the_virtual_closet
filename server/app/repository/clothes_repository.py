from app.models.clothes import ClotheCreate, Clothes, ClothePublic, ClotheUpdate
import logging
from sqlmodel import Session, select, SQLModel
from app.models.brands import Brands
from app.models.users import Users


logger = logging.getLogger(__name__)

# ============================================
# SERVICE FUNCTIONS
# ============================================

def create_item(clothe_data: ClotheCreate, session: Session) -> ClothePublic:
    """
    Create a new clothing item in the database

    Args:
        session (Session): SQLModel session connected to the database
        clothe_data (ClotheCreate): Clothing item data to insert

    Returns:
        dict: Created clothing item data

    Raises:
        Exception: If error during insertion
    """
    try:
        clothe_db = Clothes.model_validate(clothe_data.model_dump())
        session.add(clothe_db)
        session.commit()
        session.refresh(clothe_db)
        return ClothePublic.model_validate(clothe_db)
    except Exception as e:
        logger.error(f"Erreur lors de l'insertion: {str(e)}")
        raise Exception("Erreur lors de la création du vêtement")
    

def get_all_clothes(session: Session) -> list[ClothePublic]:
    """ 
    Get all clothes from the database

    Args:
        session (Session): SQLModel session connected to the database

    Returns:
        list: All the clothes

    Raises:
        Exception: If error during retrieval
    """ 
    try:
        statement = select(Clothes)
        clothes = session.exec(statement).all()
        return [ClothePublic.model_validate(clothe) for clothe in clothes]
    except Exception as e:
        logger.error(f"Erreur lors de la récupération du catalogue: {str(e)}")
        raise Exception("Erreur lors de la récupération des vêtements")


def get_item(session: Session, item_id: int) -> ClothePublic | None:
    """ 
    Retrieve a single clothing item by its ID

    Args:
        session (Session): SQLModel session connected to the database
        item_id (int): ID of the clothing item

    Returns:
        ClothePublic object or None: Clothing item data or None if not found

    Raises:
        Exception: If error during retrieval
    """ 
    try:
        statement = select(Clothes).where(Clothes.id == item_id)
        item = session.exec(statement).first()
        if item is None:
            return None
        return ClothePublic.model_validate(item)
    except Exception as e:
        logger.error(f"Erreur lors de la récupération du vêtement: {str(e)}")
        raise Exception("Erreur lors de la récupération du vêtement")
    

def update_item(clothe_updated: ClotheUpdate, session: Session, item_id: int) -> ClothePublic:
    """ 
    Updating a piece of clothe

    Args:
        session (Session): SQLModel session connected to the database
        item_id (int): ID of the clothing item
        clothe_updated (ClotheUpdate): Fields to update

    Returns:
        ClothePublic object: Updated clothing item data

    Raises:
        Exception: If error during updating
    """ 
    try:
        clothe = session.get(Clothes, item_id)
        clothe_update = clothe_updated.model_dump(exclude_unset=True)
        clothe.sqlmodel_update(clothe_update)
        session.add(clothe)
        session.commit()
        session.refresh(clothe)
        return  ClothePublic.model_validate(clothe)
    except Exception as e:
        logger.error(f"Erreur lors de la modification: {str(e)}")
        raise Exception("Erreur lors de la mise à jour du vêtement")
    

def delete_item(session: Session, item_id: int) -> ClothePublic:
    """ 
    Deleting a piece of clothe

    Args:
        session (Session): SQLModel session connected to the database
        item_id (int): ID of the clothing item

    Returns:
        ClothePublic object: The deleted clothing item data

    Raises:
        Exception: If error during deletion
    """ 
    try:
        statement = select(Clothes).where(Clothes.id == item_id)
        item = session.exec(statement).one()
        public_clothe = ClothePublic.model_validate(item)
        session.delete(item)
        session.commit()
        return public_clothe
    except Exception as e:
        logger.error(f"Erreur lors de la suppression du vêtement: {str(e)}")
        raise Exception("Erreur lors de la suppression du vêtement")