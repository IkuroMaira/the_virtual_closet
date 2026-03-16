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
    Get all tags assigned to a specific piece of clothing
    """
    try:
        item_tags = tags_clothes_repository.get_all_tags_from_item(item_id, session)
        return item_tags
    
    except ValueError as e:
        error_msg = str(e)
        if "n'existe pas" in str(e):
            raise HTTPException(status_code=404, detail=error_msg)
        else:
            raise HTTPException(400, detail=error_msg)
        
    except Exception:
        logging.error(f"Erreur technique lors de la récupération des tags du vêtement {item_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupèreration des tags de ce vêtement")


@router.post("/{item_id}/tags/{tag_id}", response_model=Tags_Clothes)
def add_tag_to_item(item_id: int, tag_id: int, user_id: int = 2, session: Session = Depends(get_session)):
    """      
    Create a tag association with a piece of clothing
    """
    try:
        tag_association = tags_clothes_repository.add_tag_to_item(item_id, tag_id, user_id, session)
        return tag_association
    
    except ValueError as e:
        error_msg = str(e)
        if "n'existe pas" in error_msg:
            raise HTTPException(status_code=404, detail=error_msg)
        elif "déjà assigné" in error_msg:
            raise HTTPException(status_code=409, detail=error_msg)
        elif "maximum" in error_msg:
            raise HTTPException(status_code=400, detail=error_msg)
        else:
            raise HTTPException(400, detail=error_msg)
        
    except Exception:  
        logging.error(f"Erreur technique lors de l'ajout du tag {tag_id} au vêtement {item_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de l'ajout du tag à un vêtement")


@router.delete("/{item_id}/tags/{tag_id}", response_model=Tags_Clothes)
def remove_tag_from_item(item_id: int, tag_id: int, session: Session = Depends(get_session)):
    """          
    Delete a tag association with a piece of clothing
    """
    try:
        deleted_tag_item = tags_clothes_repository.remove_tag_from_item(item_id, tag_id, session)
        return deleted_tag_item
    
    except ValueError as e:
        error_msg = str(e)
        if "n'est pas assigné" in error_msg:
            raise HTTPException(status_code=404, detail=error_msg)
        else:
            raise HTTPException(400, detail=error_msg)
        
    except Exception:
        logging.error(f"Erreur technique lors du retrait du tag {tag_id} au vêtement {item_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors du retrait du tag au vêtement")
