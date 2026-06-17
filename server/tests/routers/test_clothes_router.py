# tests/routers/test_clothes_router.py
from datetime import datetime
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
from main import app
from app.db.database import get_session
from app.dependencies.auth import get_current_user
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


def test_get_all_clothes_returns_list(fake_clothing):
    with patch("app.routers.clothes_router.clothes_repository.get_all_items", return_value=[fake_clothing]):
        response = client.get("/clothes/")

        assert response.status_code == 200
        assert isinstance(response.json(), list)


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
