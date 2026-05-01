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
    
    except ValueError as e:
        # Nom déjà existant
        raise HTTPException(status_code=409, detail=str(e))
    
    except Exception:
        logging.error(f"Erreur technique lors de l'insertion du tag {tag.name}")
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
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération des tags")
    

@router.get("/{tag_id}", response_model=TagPublic)
def get_tag(tag_id: int, session: Session = Depends(get_session)):
    """     
    Get a tag
    """
    try:
        tag = tags_repository.get_tag(tag_id, session)
        return tag
    
    except ValueError as e:
        # Tag inexistant
        raise HTTPException(status_code=404, detail=str(e))
    
    except Exception:
        logging.error(f"Erreur technique lors de la récupération du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération du tag") 
    

@router.patch("/{tag_id}/update", response_model=TagPublic)
def update_tag(tag_id: int, tag_updated: TagUpdate, session: Session = Depends(get_session)):
    """  
    Update a tag
    """
    try:
        updated_tag = tags_repository.update_tag(tag_id, tag_updated, session)
        return updated_tag
    
    except ValueError as e:
        error_msg = str(e)
        # Tag inexistant
        if "n'existe pas" in error_msg:
            raise HTTPException(status_code=404, detail=str(e))
        elif "existe déjà" in error_msg:
            # Nom déjà existant
            raise HTTPException(status_code=409, detail=str(e))
        else:
            raise HTTPException(status_code=400, detail=str(e))
        
    except Exception:
        logging.error(f"Erreur technique lors de la mise à jour du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la mise à jour du tag")
  

@router.delete("/{tag_id}/delete", response_model=TagPublic)
def delete_tag(tag_id: int, session: Session = Depends(get_session)):
    """ 
    Delete a piece of clothe
    """
    try:
        deleted_tag = tags_repository.delete_tag(tag_id, session)
        return deleted_tag
    
    except ValueError as e:
        # Tag inexistant
        raise HTTPException(status_code=404, detail=str(e))
    
    except Exception:
        logging.error(f"Erreur technique lors de la suppression du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la suppression du tag")