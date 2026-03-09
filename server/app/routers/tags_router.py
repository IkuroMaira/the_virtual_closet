import logging
from fastapi import APIRouter, Depends, HTTPException
from app.db.database import get_session
from app.repository import tags_repository
from app.models.tags import Tags, TagCreate, TagPublic, TagUpdate
from sqlmodel import Session

router = APIRouter(
    prefix="/tags",
    tags=["Tags"]
)

@router.post("/new_tag", response_model=TagPublic)
def add_tag(tag: TagCreate, session: Session = Depends(get_session)):
    """ 
    Add a new tag
    """
    try:
        new_tag = tags_repository.add_tag(tag, session)
        return new_tag
    except Exception:
        logging.error(f"Erreur technique lors de l'insertion du tag {tag}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de l'insertion de ce tag")
    

@router.get("/", response_model=list[TagPublic])
def get_all_tags(session: Session = Depends(get_session)):
    """
    Get all tags     
    """
    try:
        tags = tags_repository.get_all_tags(session)
        return tags
    except Exception:
        logging.error(f"Erreur technique lors de la récupération des tags")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération des tag")
    

@router.get("/{item_id}", response_model=TagPublic)
def get_tag(tag_id: int, session: Session = Depends(get_session)):
    """     
    Get a tag
    """
    try:
        tag = tags_repository.get_tag(tag_id, session)

        if tag is None:
            logging.error("Le tag n'existe pas")

        return tag
    except Exception:
        logging.error(f"Erreur technique lors de la récupération du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération du tag") 
    

@router.put("/{item_id}/update", response_model=TagPublic)
def update_tag(tag_id: int, tag_updated: TagUpdate, session: Session = Depends(get_session)):
    """  
    Update a tag
    """
    try:
        updated_tag = tags_repository.update_tag(tag_id, tag_updated, session)

        if updated_tag is None:
            logging.error("Le tag n'existe pas")

        return updated_tag
    except Exception:
        logging.error(f"Erreur technique lors de la mise à jour du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la mise à jour du tag")
  

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
        logging.error(f"Erreur technique lors de la suppression du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la suppression du ta")