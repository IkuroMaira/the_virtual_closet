from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.db.database import get_session
from app.models.tags import TagPublic
from app.models.tags_clothes import Tags_Clothes
from app.repository import tags_clothes_repository
import logging

router = APIRouter(
    prefix="/clothes",
    tags=["Clothes"]
)

@router.get("/{item_id}/tags", response_model=list[TagPublic])
def get_all_tags_from_item(item_id: int, session: Session = Depends(get_session)):
    """
    Get all tags assigned to a specific piece of clothe
    """
    try:
        clothe_tags = tags_clothes_repository.get_all_tags_from_item(session, item_id)
        return clothe_tags
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/{clothe_id}/tags/{tag_id}", response_model=Tags_Clothes)
def add_tag_to_item(item_id: int, tag_id: int, user_id: int = 2, session: Session = Depends(get_session)):
    """      
    Create a tag association with a piece of clothe
    """
    try:
        tag_association = tags_clothes_repository.add_tag_to_item(item_id, session, tag_id, user_id)
        return tag_association
    except Exception as e:
        raise HTTPException(status_code=404, detail="Impossible de créer une association entre le tag et le vêtement")


@router.delete("/{clothe_id}/tags/{tag_id}", response_model=Tags_Clothes)
def remove_tag_from_item(item_id: int, tag_id: int, session: Session = Depends(get_session)):
    """          
    Delete a tag association with a piece of clothe
    """
    try:
        deleted_tag_item = tags_clothes_repository.remove_tag_from_item(session, item_id, tag_id)

        if deleted_tag_item is None:
            logging.error("L'association entre le tag et le vêtement n'existe pas")

        return deleted_tag_item
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de supprimer l'association entre le vêtement et le tag")
