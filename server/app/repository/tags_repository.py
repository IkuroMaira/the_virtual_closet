import uuid
from app.models.tags import Tags, TagCreate, TagPublic, TagUpdate
from app.models.clothes import Clothes
from app.models.tags_clothes import Tags_Clothes
import logging
from sqlmodel import Session, select

logger = logging.getLogger(__name__)

# ============================================
# SERVICE FUNCTIONS
# ============================================


def add_tag(tag: TagCreate, user_id: uuid.UUID, session: Session) -> TagPublic:
    """
    Add a new tag

    Args:
        tag (TagCreate): Tag data to insert
        user_id (uuid.UUID): Supabase Auth user UUID from JWT
        session (Session): SQLModel session connected to the database

    Returns:
        TagPublic: Created tag data

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
    tag_db.user_id = user_id
    session.add(tag_db)
    session.commit()
    session.refresh(tag_db)

    return TagPublic.model_validate(tag_db)


def get_all_tags(user_id: uuid.UUID, session: Session) -> list[TagPublic]:
    """
    Get all tags from the database for a specific user

    Args:
        user_id (uuid.UUID): Supabase Auth user UUID from JWT
        session (Session): SQLModel session connected to the database

    Returns:
        list: All tags belonging to the user (empty list if none)
    """
    statement = select(Tags).where(Tags.user_id == user_id)
    tags = session.exec(statement).all()

    return [TagPublic.model_validate(tag) for tag in tags]


def get_tag(tag_id: int, session: Session) -> TagPublic:
    statement = select(Tags).where(Tags.id == tag_id)
    tag = session.exec(statement).first()

    if not tag:
        raise ValueError(f"Le tag avec l'ID {tag_id} n'existe pas")

    return TagPublic.model_validate(tag)


def get_all_items_from_tag(tag_id: int, session: Session) -> list[Clothes]:
    tag = session.get(Tags, tag_id)
    if not tag:
        raise ValueError(f"Le tag avec l'ID {tag_id} n'existe pas")
    statement = (
        select(Clothes)
        .join(Tags_Clothes, Clothes.id == Tags_Clothes.clothe_id)  # type: ignore[arg-type]
        .where(Tags_Clothes.tag_id == tag_id))
    clothes = session.exec(statement).all()
    return list(clothes)


def update_tag(tag_id: int, tag_updated: TagUpdate, session: Session) -> TagPublic:
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

    return TagPublic.model_validate(tag)


def delete_tag(tag_id: int, session: Session) -> TagPublic:
    statement = select(Tags).where(Tags.id == tag_id)
    tag = session.exec(statement).first()

    if not tag:
        raise ValueError(f"Le tag avec l'ID {tag_id} n'existe pas")

    public_tag = TagPublic.model_validate(tag)
    session.delete(tag)
    session.commit()

    return public_tag
