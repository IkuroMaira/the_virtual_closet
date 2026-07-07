# tests/routers/test_clothes_router.py
from datetime import datetime
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
from main import app
from app.db.database import get_session
from app.dependencies.auth import get_current_user
from PIL import Image
import io
import pytest

client = TestClient(app)

@pytest.fixture(autouse=True)
def override_session():
    mock_session = MagicMock()
    app.dependency_overrides[get_session] = lambda: mock_session
    app.dependency_overrides[get_current_user] = lambda: {"sub": "00000000-0000-0000-0000-000000000001"}
    yield mock_session
    app.dependency_overrides.clear()


@pytest.fixture
def fake_clothing():
    return {
        "id": 1,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "name": "t-shirt de mon père",
        "category": "Tops",
        "color": "Bleu",
        "size": "M",
        "status": "Actif",
        "style": "Casual",
        "season": "Été",
        "materials": "Coton",
        "note": 4,
        "comment": "Mon t-shirt préféré qui vient de mon père",
        "picture": "",
        "brand_id": 2,
        "user_id": None
    }


def test_get_all_clothes_returns_paginated_page(fake_clothing):
    with patch("app.routers.clothes_router.clothes_repository.get_all_items", return_value=([fake_clothing], 1)):
        response = client.get("/clothes/")

        assert response.status_code == 200
        body = response.json()
        assert isinstance(body["items"], list)
        assert body["total"] == 1
        assert body["page"] == 1
        assert body["page_size"] == 20
        assert body["total_pages"] == 1


def test_get_all_clothes_forwards_page_query_param(fake_clothing):
    with patch("app.routers.clothes_router.clothes_repository.get_all_items", return_value=([fake_clothing], 25)) as mock_get_all:
        response = client.get("/clothes/?page=2")

        assert response.status_code == 200
        assert response.json()["page"] == 2
        assert response.json()["total_pages"] == 2
        mock_get_all.assert_called_once()
        _, kwargs = mock_get_all.call_args
        assert kwargs["page"] == 2
        assert kwargs["page_size"] == 20


def test_get_all_clothes_invalid_page_returns_422():
    response = client.get("/clothes/?page=0")

    assert response.status_code == 422


def test_get_clothing_by_id_returns_200(fake_clothing):
    with patch("app.routers.clothes_router.clothes_repository.get_item", return_value=fake_clothing):
        response = client.get("/clothes/item/1")

        assert response.status_code == 200
        assert response.json()["id"] == 1
        assert response.json()["name"] == "t-shirt de mon père"


def test_get_clothing_by_id_not_found_returns_404():
    with patch("app.routers.clothes_router.clothes_repository.get_item", side_effect=ValueError("n'existe pas")):
        response = client.get("/clothes/item/99999")

        assert response.status_code == 404


def test_create_clothing_returns_201(fake_clothing):
    payload = {
        "name": "t-shirt de mon père",
        "category": "Tops",
        "color": "Bleu",
        "size": "M",
        "status": "Actif",
        "style": "Casual",
        "season": "Été",
        "materials": "Coton",
        "note": 4,
        "comment": "Mon t-shirt préféré qui vient de mon père",
        "picture": "",
        "brand_id": 2
    }
    with patch("app.routers.clothes_router.clothes_repository.add_item", return_value=fake_clothing):
        response = client.post("/clothes/new_clothing", json=payload)

        assert response.status_code == 201
        assert response.json()["name"] == payload["name"]


def test_create_clothing_duplicate_name_returns_409(fake_clothing):
    payload = {
        "name": "t-shirt de mon père",
        "category": "Tops",
        "color": "Bleu",
    }
    with patch("app.routers.clothes_router.clothes_repository.add_item", side_effect=ValueError("existe déjà")):
        response = client.post("/clothes/new_clothing", json=payload)

        assert response.status_code == 409


# PATCH
def test_update_clothing_returns_200(fake_clothing):
    payload = {"name": "t-shirt de mon grand-père"}
    with patch("app.routers.clothes_router.clothes_repository.update_item", return_value=fake_clothing):
        response = client.patch("/clothes/item/1/update", json=payload)

        assert response.status_code == 200
        assert response.json()["id"] == 1


def test_update_clothing_not_found_returns_404():
    payload = {"name": "t-shirt de mon grand-père"}
    with patch("app.routers.clothes_router.clothes_repository.update_item", side_effect=ValueError("n'existe pas")):
        response = client.patch("/clothes/item/99999/update", json=payload)

        assert response.status_code == 404


def test_update_clothing_duplicate_name_returns_409():
    payload = {"name": "t-shirt de mon père"}
    with patch("app.routers.clothes_router.clothes_repository.update_item", side_effect=ValueError("existe déjà")):
        response = client.patch("/clothes/item/1/update", json=payload)

        assert response.status_code == 409


# GET /enums
def test_get_enums_returns_200():
    response = client.get("/clothes/enums")

    assert response.status_code == 200
    assert "ColorEnum" in response.json()
    assert "CategoryEnum" in response.json()
    assert "SizeEnum" in response.json()
    assert "StatusEnum" in response.json()
    assert "StyleEnum" in response.json()
    assert "SeasonEnum" in response.json()
    assert "MaterialsEnum" in response.json()


# DELETE
def test_delete_clothing_returns_200(fake_clothing):
    with patch("app.routers.clothes_router.clothes_repository.delete_item", return_value=fake_clothing):
        response = client.delete("/clothes/item/1/delete")

        assert response.status_code == 200
        assert response.json()["id"] == 1


def test_delete_clothing_not_found_returns_404():
    with patch("app.routers.clothes_router.clothes_repository.delete_item", side_effect=ValueError("n'existe pas")):
        response = client.delete("/clothes/item/99999/delete")

        assert response.status_code == 404


# AUTHENTIFICATION - routes protégées
def test_get_all_clothes_without_token_returns_401():
    app.dependency_overrides.pop(get_current_user, None)

    response = client.get("/clothes/")

    assert response.status_code == 401


def test_get_all_clothes_with_invalid_token_returns_401():
    app.dependency_overrides.pop(get_current_user, None)

    response = client.get("/clothes/", headers={"Authorization": "Bearer invalid.token.here"})

    assert response.status_code == 401


def test_get_item_without_token_returns_401():
    app.dependency_overrides.pop(get_current_user, None)

    response = client.get("/clothes/item/1")

    assert response.status_code == 401


# POST /process-picture
def _fake_rembg_output():
    """Image RGBA 10x10 avec un carré opaque au centre, simule la sortie de rembg."""
    img = Image.new("RGBA", (10, 10), (0, 0, 0, 0))
    for x in range(2, 8):
        for y in range(2, 8):
            img.putpixel((x, y), (255, 0, 0, 255))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def _fake_upload_image():
    """Petite image PNG valide utilisée comme fichier envoyé par le client."""
    img = Image.new("RGB", (10, 10), (0, 0, 0))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def test_process_picture_without_token_returns_401():
    app.dependency_overrides.pop(get_current_user, None)

    response = client.post(
        "/clothes/process-picture",
        files={"file": ("shirt.png", b"fake-bytes", "image/png")},
    )

    assert response.status_code == 401


def test_process_picture_returns_200_with_processed_image():
    app.state.rembg_session = MagicMock()

    with patch("app.routers.clothes_router.rembg_remove", return_value=_fake_rembg_output()):
        response = client.post(
            "/clothes/process-picture",
            files={"file": ("shirt.png", _fake_upload_image(), "image/png")},
        )

    assert response.status_code == 200
    assert response.headers["content-type"] == "image/webp"


def test_process_picture_rembg_failure_returns_500():
    app.state.rembg_session = MagicMock()

    with patch("app.routers.clothes_router.rembg_remove", side_effect=Exception("modèle indisponible")):
        response = client.post(
            "/clothes/process-picture",
            files={"file": ("shirt.png", _fake_upload_image(), "image/png")},
        )

    assert response.status_code == 500
    assert response.json()["detail"] == "Erreur lors du traitement de l'image"


def test_process_picture_invalid_content_type_returns_400():
    response = client.post(
        "/clothes/process-picture",
        files={"file": ("shirt.gif", _fake_upload_image(), "image/gif")},
    )

    assert response.status_code == 400
    assert "supporté" in response.json()["detail"]


def test_process_picture_too_large_returns_413():
    oversized = b"0" * (10 * 1024 * 1024 + 1)

    response = client.post(
        "/clothes/process-picture",
        files={"file": ("shirt.png", oversized, "image/png")},
    )

    assert response.status_code == 413
    assert "taille maximale" in response.json()["detail"]


def test_process_picture_corrupted_file_returns_400():
    response = client.post(
        "/clothes/process-picture",
        files={"file": ("shirt.png", b"not-a-real-image", "image/png")},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Fichier image invalide ou corrompu"
