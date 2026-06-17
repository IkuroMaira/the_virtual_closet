import uuid
import logging
from fastapi import APIRouter, Depends, HTTPException
from app.db.database import get_session
from app.repository import tags_repository
from app.models.tags import TagCreate, TagPublic, TagUpdate
from app.models.clothes import ClothePublic
from app.dependencies.auth import get_current_user
from sqlmodel import Session

router = APIRouter(
    prefix="/tags",
    tags=["Tags"]
)


@router.post("/new_tag", response_model=TagPublic)
def add_tag(tag: TagCreate, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        user_id = uuid.UUID(current_user["sub"])
        new_tag = tags_repository.add_tag(tag, user_id, session)
        return new_tag

    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))

    except Exception:
        logging.error(f"Erreur technique lors de l'insertion du tag {tag.name}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de l'insertion de ce tag")


@router.get("/", response_model=list[TagPublic])
def get_all_tags(session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        user_id = uuid.UUID(current_user["sub"])
        tags = tags_repository.get_all_tags(user_id, session)
        return tags

    except Exception:
        logging.error("Erreur technique lors de la récupération des tags")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération des tags")


@router.get("/tag/{tag_id}", response_model=TagPublic)
def get_tag(tag_id: int, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        tag = tags_repository.get_tag(tag_id, session)
        return tag

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except Exception:
        logging.error(f"Erreur technique lors de la récupération du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupération du tag")


@router.get("/tag/{tag_id}/clothes", response_model=list[ClothePublic])
def get_all_items_from_tag(tag_id: int, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        tag_items = tags_repository.get_all_items_from_tag(tag_id, session)
        return tag_items

    except ValueError as e:
        error_msg = str(e)
        if "n'existe pas" in str(e):
            raise HTTPException(status_code=404, detail=error_msg)
        else:
            raise HTTPException(400, detail=error_msg)

    except Exception:
        logging.error(f"Erreur technique lors de la récupération des vêtements associés au tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la récupèreration des vêtements associés au tag")


@router.patch("/tag/{tag_id}/update", response_model=TagPublic)
def update_tag(tag_id: int, tag_updated: TagUpdate, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        updated_tag = tags_repository.update_tag(tag_id, tag_updated, session)
        return updated_tag

    except ValueError as e:
        error_msg = str(e)
        if "n'existe pas" in error_msg:
            raise HTTPException(status_code=404, detail=str(e))
        elif "existe déjà" in error_msg:
            raise HTTPException(status_code=409, detail=str(e))
        else:
            raise HTTPException(status_code=400, detail=str(e))

    except Exception:
        logging.error(f"Erreur technique lors de la mise à jour du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la mise à jour du tag")


@router.delete("/tag/{tag_id}/delete", response_model=TagPublic)
def delete_tag(tag_id: int, session: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    try:
        deleted_tag = tags_repository.delete_tag(tag_id, session)
        return deleted_tag

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except Exception:
        logging.error(f"Erreur technique lors de la suppression du tag {tag_id}")
        raise HTTPException(status_code=500, detail="Erreur interne lors de la suppression du tag")
