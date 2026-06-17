import uuid
import logging
from fastapi import APIRouter, Depends, HTTPException
from app.repository import clothes_repository
from app.models.clothes import ClotheCreate, ClothePublic, ClotheUpdate
from app.db.database import get_session
from app.dependencies.auth import get_current_user
from sqlmodel import Session
from app.enums import ColorEnum, StatusEnum, CategoryEnum, SizeEnum, StyleEnum, SeasonEnum, MaterialsEnum

router = APIRouter(
    prefix="/clothes",
    tags=["Clothes"]
)


@router.post("/new_clothing", response_model=ClothePublic, status_code=201)
def add_item(item: ClotheCreate, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        user_id = uuid.UUID(current_user["sub"])
        new_item = clothes_repository.add_item(item, user_id, session)
        return new_item

    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))

    except Exception as e:
        logging.error(f"Erreur technique lors de l'insertion du vêtement {item.name}: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de l'insertion de ce vêtement")


@router.get("/", response_model=list[ClothePublic])
def get_all_items(session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        user_id = uuid.UUID(current_user["sub"])
        items = clothes_repository.get_all_items(user_id, session)
        return items

    except Exception as e:
        logging.error(f"Erreur technique lors de la récupération des vêtements du catalogue: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération des vêtements du catalogue")


@router.get("/item/{item_id}", response_model=ClothePublic)
def get_item(item_id: int, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        item = clothes_repository.get_item(item_id, session)
        return item

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except Exception as e:
        logging.error(f"Erreur technique lors de la récupération du vêtement {item_id}: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération de ce vêtement")


@router.patch("/item/{item_id}/update", response_model=ClothePublic)
def update_item(item_id: int, item_updated: ClotheUpdate, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        updated_item = clothes_repository.update_item(item_id, item_updated, session)
        return updated_item

    except ValueError as e:
        error_msg = str(e)
        if "n'existe pas" in error_msg:
            raise HTTPException(status_code=404, detail=str(e))
        elif "existe déjà" in error_msg:
            raise HTTPException(status_code=409, detail=str(e))
        else:
            raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        logging.error(f"Erreur technique lors de la mise à jour du vêtement {item_id}: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la mise à jour de ce vêtement")


@router.delete("/item/{item_id}/delete", response_model=ClothePublic)
def delete_item(item_id: int, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        deleted_item = clothes_repository.delete_item(item_id, session)
        return deleted_item

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except Exception as e:
        logging.error(f"Erreur technique lors de la suppression du vêtement {item_id}: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la suppression de ce vêtement")


@router.get("/enums", response_model=dict)
def get_clothes_enums():
    try:
        enums = {
            "ColorEnum": [e.value for e in ColorEnum],
            "StatusEnum": [e.value for e in StatusEnum],
            "CategoryEnum": [e.value for e in CategoryEnum],
            "SizeEnum": [e.value for e in SizeEnum],
            "StyleEnum": [e.value for e in StyleEnum],
            "SeasonEnum": [e.value for e in SeasonEnum],
            "MaterialsEnum": [e.value for e in MaterialsEnum],
        }
        return enums

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        logging.error(f"Erreur technique lors de la récupération des enums: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération des enums")
