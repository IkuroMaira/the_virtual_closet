import logging

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.db.database import get_session
from app.repository import tags_repository
from app.models import tags
from sqlmodel import Session

router = APIRouter(
    prefix="/tags",
    tags=["Tags"]
)

@router.post("/new_tag", response_model=tags.TagPublic)
def create_tag(tag: tags.TagCreate, session: Session = Depends(get_session)):
    """ 
    Create a new tag
    """
    try:
        new_tag = tags_repository.create_tag(tag, session)
        return new_tag
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

""" @router.get("/")
def get_all_tags(supabase: Client = Depends(get_supabase)):
    
    Get all tags 
    
    try:
        tags = tags_repository.get_all_tags(supabase)

        if tags is None:
            logging.error("Les tags n'existent pas")

        return {"tags": tags}
    except Exception:
        raise HTTPException(status_code=404, detail="Impossible de récupérer les tags")
    

@router.get("/{item_id}")
def get_tag(tag_id: int, supabase: Client = Depends(get_supabase)):
    
    Get a tag
    
    try:
        tag = tags_repository.get_tag(supabase, tag_id)

        if tag is None:
            logging.error("Le tag n'existe pas")

        return {"tag": tag}
    except Exception:
        raise HTTPException(status_code=404, detail="Impossible de trouver le tag")    
    

@router.put("/{item_id}/update")
def update_tag(tag_id: int, tag: tags.Tag, supabase: Client = Depends(get_supabase)):
    
    Update a tag
    
    try:
        updated_tag = tags_repository.update_tag(tag, supabase, tag_id)

        if updated_tag is None:
            logging.error("Le tag n'existe pas")

        return  {"updated_tag": updated_tag}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de mettre à jour le tag")
    

@router.delete("/{item_id}/delete")
def delete_tag(tag_id: int, supabase: Client = Depends(get_supabase)):
    
    Delete a piece of clothe
    
    try:
        deleted_tag = tags_repository.delete_tag(supabase, tag_id)

        if deleted_tag is None:
            logging.error("Le tag n'existe pas")

        return  {"deleted_tag": deleted_tag}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de supprimer le tag") """