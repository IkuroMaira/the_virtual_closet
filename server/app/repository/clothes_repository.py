from app.models.clothes import ClotheCreate, Clothes, ClothePublic, ClotheUpdate
import logging
from sqlmodel import Session, select, SQLModel
from app.models.brands import Brands
from app.models.users import Users
from datetime import datetime


logger = logging.getLogger(__name__)

# ============================================
# SERVICE FUNCTIONS
# ============================================

def add_item(item: ClotheCreate, session: Session) -> ClothePublic:
    """
    Add a new piece of clothing 

    Args:
        item (ClotheCreate): Clothing item data to insert
        session (Session): SQLModel session connected to the database

    Returns:
        dict: Created clothing item data

    Raises:
        ValueError: If item name already exist
    """
    existing = session.exec(
        select(Clothes)
        .where(Clothes.name == item.name)
    ).first()

    if existing:
        raise ValueError(f"Un vêtement nommé '{item.name}' existe déjà")

    item_db = Clothes.model_validate(item.model_dump())
    session.add(item_db)
    session.commit()
    session.refresh(item_db)

    return ClothePublic.model_validate(item_db)
    

def get_all_items(session: Session) -> list[ClothePublic]:
    """ 
    Get all items from the wardrobe

    Args:
        session (Session): SQLModel session connected to the database

    Returns:
        list: All the items (empty list if none)
    """ 
    statement = select(Clothes)
    items = session.exec(statement).all()

    return [ClothePublic.model_validate(item) for item in items]


def get_item(item_id: int, session: Session) -> ClothePublic:
    """ 
    Get a piece of clothing by its ID

    Args:
        item_id (int): ID of the clothing item
        session (Session): SQLModel session connected to the database

    Returns:
        ClothePublic object: Clothing item data

    Raises:
        ValueError: If clothing item doesn't exist
    """ 
    statement = select(Clothes).where(Clothes.id == item_id)
    item = session.exec(statement).first()

    if not item:
        raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")
    
    return ClothePublic.model_validate(item)
    

def update_item(item_id: int, item_updated: ClotheUpdate, session: Session) -> ClothePublic:
    """ 
    Updating a piece of clothe

    Args:
        item_id (int): ID of the clothing item
        item_updated (ClotheUpdate): Fields to update
        session (Session): SQLModel session connected to the database

    Returns:
        ClothePublic object: Updated clothing item data

    Raises:
        ValueError: If item doesn't exist or name already exists
    """ 
    item = session.get(Clothes, item_id)

    if not item:
        raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")
    
    if item_updated.name and item_updated.name != item.name:
        existing = session.exec(
            select(Clothes)
            .where(Clothes.name == item_updated.name)
        ).first()
        if existing:
            raise ValueError(f"Un vêtement nommé '{item_updated.name}' existe déjà")
        
    item_update = item_updated.model_dump(exclude_unset=True)
    item.updated_at = datetime.now()
    item.sqlmodel_update(item_update)
    session.add(item)
    session.commit()
    session.refresh(item)

    return ClothePublic.model_validate(item)

    
def delete_item(item_id: int, session: Session) -> ClothePublic:
    """ 
    Deleting a piece of clothing

    Args:
        item_id (int): ID of the clothing item
        session (Session): SQLModel session connected to the database

    Returns:
        ClothePublic object: The deleted clothing item data

    Raises:
        ValueError: If clothing item doesn't exist
    """ 
    statement = select(Clothes).where(Clothes.id == item_id)
    item = session.exec(statement).first()
    
    if not item:
        raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")
    
    public_item = ClothePublic.model_validate(item)
    session.delete(item)
    session.commit()

    return public_item