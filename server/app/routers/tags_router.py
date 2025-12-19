import logging

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.db.database import get_session
from app.repository import tags_repository
from app.models.tags import Tags, TagCreate, TagPublic, TagUpdate
from sqlmodel import Session

router = APIRouter(
    prefix="/tags",
    tags=["Tags"]
)

@router.post("/new_tag", response_model=TagPublic)
def create_tag(tag: TagCreate, session: Session = Depends(get_session)):
    """ 
    Create a new tag
    """
    try:
        new_tag = tags_repository.create_tag(tag, session)
        return new_tag
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.get("/", response_model=list[TagPublic])
def get_all_tags(session: Session = Depends(get_session)):
    """
    Get all tags     
    """
    try:
        tags = tags_repository.get_all_tags(session)
        return tags
    except Exception as e:
        logging.error(f"Erreur: {e}")
        raise HTTPException(status_code=404, detail="Impossible de récupérer les tags")
    

@router.get("/{item_id}", response_model=TagPublic)
def get_tag(tag_id: int, session: Session = Depends(get_session)):
    """     
    Get a tag
    """
    try:
        tag = tags_repository.get_tag(session, tag_id)

        if tag is None:
            logging.error("Le tag n'existe pas")

        return tag
    except Exception:
        raise HTTPException(status_code=404, detail="Impossible de trouver le tag")    
    

@router.put("/{item_id}/update", response_model=TagPublic)
def update_tag(tag_id: int, tag_updated: TagUpdate, session: Session = Depends(get_session)):
    """  
    Update a tag
    """
    try:
        updated_tag = tags_repository.update_tag(tag_updated, session, tag_id)

        if updated_tag is None:
            logging.error("Le tag n'existe pas")

        return updated_tag
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de mettre à jour le tag")
  

@router.delete("/{item_id}/delete", response_model=TagPublic)
def delete_tag(tag_id: int, session: Session = Depends(get_session)):
    """ 
    Delete a piece of clothe
    """
    try:
        deleted_tag = tags_repository.delete_tag(session, tag_id)

        if deleted_tag is None:
            logging.error("Le tag n'existe pas")

        return deleted_tag
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de supprimer le tag")