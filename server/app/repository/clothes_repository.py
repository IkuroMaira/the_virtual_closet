import uuid
from app.models.clothes import ClotheCreate, Clothes, ClothePublic, ClotheUpdate
from app.models.tags_clothes import Tags_Clothes
import logging
from sqlmodel import Session, select, func
from datetime import datetime


logger = logging.getLogger(__name__)

# ============================================
# SERVICE FUNCTIONS
# ============================================


def add_item(item: ClotheCreate, user_id: uuid.UUID, session: Session) -> ClothePublic:
    """
    Add a new piece of clothing

    Args:
        item (ClotheCreate): Clothing item data to insert
        user_id (uuid.UUID): Supabase Auth user UUID from JWT
        session (Session): SQLModel session connected to the database

    Returns:
        ClothePublic: Created clothing item data

    Raises:
        ValueError: If item name already exist
    """
    existing = session.exec(
        select(Clothes)
        .where(Clothes.name == item.name)
        .where(Clothes.user_id == user_id)
    ).first()

    if existing:
        raise ValueError(f"Un vêtement nommé '{item.name}' existe déjà")

    item_db = Clothes.model_validate(item.model_dump())
    item_db.user_id = user_id
    session.add(item_db)
    session.commit()
    session.refresh(item_db)

    return ClothePublic.model_validate(item_db)


def get_all_items(user_id: uuid.UUID, session: Session, page: int = 1, page_size: int = 20) -> tuple[list[ClothePublic], int]:
    """
    Get a paginated page of items from the wardrobe for a specific user

    Args:
        user_id (uuid.UUID): Supabase Auth user UUID from JWT
        session (Session): SQLModel session connected to the database
        page (int): 1-indexed page number
        page_size (int): number of items per page

    Returns:
        tuple: (items for the requested page, total number of items belonging to the user)
    """
    total = session.exec(
        select(func.count())
        .select_from(Clothes)
        .where(Clothes.user_id == user_id)
    ).one()

    statement = (
        select(Clothes)
        .where(Clothes.user_id == user_id)
        .order_by(Clothes.id)  # type: ignore[arg-type]
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    items = session.exec(statement).all()

    return [ClothePublic.model_validate(item) for item in items], total


def get_item(item_id: int, user_id: uuid.UUID, session: Session) -> ClothePublic:
    statement = (
        select(Clothes)
        .where(Clothes.id == item_id)
        .where(Clothes.user_id == user_id)
    )
    item = session.exec(statement).first()

    if not item:
        raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")

    return ClothePublic.model_validate(item)


def update_item(item_id: int, item_updated: ClotheUpdate, user_id: uuid.UUID, session: Session) -> ClothePublic:
    statement = (
        select(Clothes)
        .where(Clothes.id == item_id)
        .where(Clothes.user_id == user_id)
    )
    item = session.exec(statement).first()

    if not item:
        raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")

    if item_updated.name and item_updated.name != item.name:
        existing = session.exec(
            select(Clothes)
            .where(Clothes.name == item_updated.name)
            .where(Clothes.user_id == item.user_id)
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


def delete_item(item_id: int, user_id: uuid.UUID, session: Session) -> ClothePublic:
    statement = (
        select(Clothes)
        .where(Clothes.id == item_id)
        .where(Clothes.user_id == user_id)
    )
    item = session.exec(statement).first()

    if not item:
        raise ValueError(f"Le vêtement avec l'ID {item_id} n'existe pas")

    public_item = ClothePublic.model_validate(item)

    tag_links = session.exec(
        select(Tags_Clothes).where(Tags_Clothes.clothe_id == item_id)
    ).all()
    for tag_link in tag_links:
        session.delete(tag_link)
    session.flush()

    session.delete(item)
    session.commit()

    return public_item
