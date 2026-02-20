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
def create_item(item: ClotheCreate, session: Session = Depends(get_session)):
    """
    Create a new clothe
    """
    try:
        new_item = clothes_repository.create_item(item, session)
        return new_item
    except Exception as e:
        raise HTTPException(status_code=400, detail="Impossible d'insérer le vêtement")
    

@router.get("/", response_model=list[ClothePublic])
def get_all_clothes(session: Session = Depends(get_session)):
    """ 
    Get all clothes from the wardrobe
    """ 
    try:
        clothes = clothes_repository.get_all_clothes(session)
        return clothes
    except Exception as e:
        logging.error(f"Erreur: {e}")
        raise HTTPException(status_code=404, detail="Impossible de récupérer les vêtements du catalogue")

# On doit apparemment placer ici, parce que sinon Fastapi peut confondre avec /{item_id}
@router.get("/categories")
def get_categories():
    """
    Get all available categories from CategoryEnum
    """
    try:
        categories = [{"value": category.value} for category in clothes.CategoryEnum]
        return {"categories": categories}
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de trouver la catégorie")
    

@router.get("/{item_id}", response_model=ClothePublic)
def get_item(item_id: int, session: Session = Depends(get_session)):
    """ 
    Get a clothe
    """ 
    try:
        clothe = clothes_repository.get_item(session, item_id)
        if clothe is None:
            logging.error("Le vêtement n'existe pas")

        return clothe
    except Exception:
        raise HTTPException(status_code=404, detail="Impossible de trouver le vêtement")

    
@router.put("/{item_id}/update", response_model=ClothePublic)
def update_item(item_id: int, item_updated: ClotheUpdate, session: Session = Depends(get_session)):
    """
    Update a piece of clothe
    """
    try:
        updated_item = clothes_repository.update_item(item_updated, session, item_id)
       
        if updated_item is None:
            logging.error("Le vêtement n'existe pas")

        return updated_item
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de mettre à jour le vêtement")
    

@router.delete("/{item_id}/delete", response_model=ClothePublic)
def delete_item(item_id: int, session: Session = Depends(get_session)):
    """ 
    Delete a piece of clothe
    """ 
    try:
        deleted_item = clothes_repository.delete_item(session, item_id)

        if deleted_item is None:
            logging.error("Le vêtement n'existe pas")

        return deleted_item
    except Exception:
        raise HTTPException(status_code=500, detail="Impossible de supprimer le vêtement")
