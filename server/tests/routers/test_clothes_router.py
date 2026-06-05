# tests/routers/test_clothes_router.py
from datetime import datetime
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
from main import app
from app.db.database import get_session
import pytest

client = TestClient(app)

@pytest.fixture(autouse=True)
def override_session():
    mock_session = MagicMock()
    app.dependency_overrides[get_session] = lambda: mock_session
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
