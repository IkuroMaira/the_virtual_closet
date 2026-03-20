import logging
from fastapi import APIRouter, Depends, HTTPException
from app.repository import clothes_repository
from app.models.clothes import ClotheCreate, ClothePublic, ClotheUpdate
from app.db.database import get_session
from sqlmodel import Session

router = APIRouter(
    prefix="/clothes",
    tags=["Clothes"]
)

@router.post("/new_clothe", response_model=ClothePublic)
def add_item(item: ClotheCreate, session: Session = Depends(get_session)):
    """
    Adding a new piece of clothing
    """
    try:
        new_item = clothes_repository.add_item(item, session)
        return new_item
    
    except ValueError as e:
        # Nom déjà existant
        raise HTTPException(status_code=409, detail=str(e))
    
    except Exception:
        logging.error(f"Erreur technique lors de l'insertion du vêtement {item.name}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de l'insertion de ce vêtement")
    

@router.get("/", response_model=list[ClothePublic])
def get_all_items(session: Session = Depends(get_session)):
    """ 
    Get all items from the wardrobe
    """ 
    try:
        items = clothes_repository.get_all_items(session)
        return items
    
    except Exception:
        logging.error(f"Erreur technique lors de la récupération des vêtements du catalogue")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération des vêtements du catalogue")
    

@router.get("/{item_id}", response_model=ClothePublic)
def get_item(item_id: int, session: Session = Depends(get_session)):
    """ 
    Get a piece of clothing
    """ 
    try:
        item = clothes_repository.get_item(item_id, session)
        return item
    
    except ValueError as e:
        # Vêtement inexistant
        raise HTTPException(status_code=404, detail=str(e))

    except Exception:
        logging.error(f"Erreur technique lors de la récupération du vêtement {item_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération de ce vêtement")

    
@router.put("/{item_id}/update", response_model=ClothePublic)
def update_item(item_id: int, item_updated: ClotheUpdate, session: Session = Depends(get_session)):
    """
    Update a piece of clothing
    """
    try:
        updated_item = clothes_repository.update_item(item_id, item_updated, session)
        return updated_item
        
    except ValueError as e:
        error_msg = str(e)
        # Vêtement inexistant
        if "n'existe pas" in error_msg:
            raise HTTPException(status_code=404, detail=str(e))
        elif "existe déjà" in error_msg:
            # Nom déjà existant
            raise HTTPException(status_code=409, detail=str(e))
        else:
            raise HTTPException(status_code=400, detail=str(e))

    except Exception:
        logging.error(f"Erreur technique lors de la mise à jour du vêtement {item_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la mise à jour de ce vêtement")
    

@router.delete("/{item_id}/delete", response_model=ClothePublic)
def delete_item(item_id: int, session: Session = Depends(get_session)):
    """ 
    Delete a piece of clothing
    """ 
    try:
        deleted_item = clothes_repository.delete_item(item_id, session)
        return deleted_item
    
    except ValueError as e:
        # Vêtement inexistant
        raise HTTPException(status_code=404, detail=str(e))
    
    except Exception:
        logging.error(f"Erreur technique lors de la suppression du vêtement {item_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la suppression de ce vêtement")
