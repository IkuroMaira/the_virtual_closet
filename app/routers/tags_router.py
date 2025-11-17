import logging

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.db.database import get_supabase
from app.services import tags_service
from app.models import tags

router = APIRouter(
    prefix="/tags",
    tags=["Tags"]
)

@router.post("/new_tag")
async def create_tag(tag: tags.Tag, supabase: Client = Depends(get_supabase)):
    """ 
    Create a new tag
    """
    try:
        new_tag = await tags_service.create_tag(tag, supabase)
        return {"item": new_tag}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Impossible d'insérer le tag")
    

@router.get("/")
async def get_all_tags(supabase: Client = Depends(get_supabase)):
    """
    Get all tags 
    """
    try:
        tags = await tags_service.get_all_tags(supabase)

        if tags is None:
            logging.error("Les tags n'existent pas")

        return {"tags": tags}
    except Exception:
        raise HTTPException(status_code=404, detail="Impossible de récupérer les tags")
    

@router.get("/{item_id}")
async def get_tag(tag_id: int, supabase: Client = Depends(get_supabase)):
    """
    Get a tag
    """
    try:
        tag =  await tags_service.get_tag(supabase, tag_id)

        if tag is None:
            logging.error("Le tag n'existe pas")

        return {"tag": tag}
    except Exception:
        raise HTTPException(status_code=404, detail="Impossible de trouver le tag")    
    

@router.put("/{item_id}/update")
async def update_tag(tag_id: int, tag: tags.Tag, supabase: Client = Depends(get_supabase)):
    """
    Update a tag
    """
    try:
        updated_tag = await tags_service.update_tag(tag, supabase, tag_id)

        if updated_tag is None:
            logging.error("Le tag n'existe pas")

        return  {"updated_tag": updated_tag}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de mettre à jour le tag")
    

@router.delete("/{item_id}/delete")
async def delete_tag(tag_id: int, supabase: Client = Depends(get_supabase)):
    """
    Delete a piece of clothe
    """
    try:
        deleted_tag = await tags_service.delete_tag(supabase, tag_id)

        if deleted_tag is None:
            logging.error("Le tag n'existe pas")

        return  {"deleted_tag": deleted_tag}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de supprimer le tag")