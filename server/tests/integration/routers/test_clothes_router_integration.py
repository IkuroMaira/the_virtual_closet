# tests/integration/routers/test_clothes_router_integration.py
from main import app
from app.dependencies.auth import get_current_user

OTHER_USER_ID = "00000000-0000-0000-0000-000000000002"


def test_create_clothing_returns_201(client):
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
        "brand_id": None
    }

    response = client.post("/clothes/new_clothing", json=payload)

    assert response.status_code == 201
    assert response.json()["name"] == payload["name"]
    assert response.json()["id"] is not None


def test_create_clothing_duplicate_name_returns_409(client):
    payload = {
        "name": "t-shirt unique",
        "category": "Tops",
        "color": "Bleu",
    }

    client.post("/clothes/new_clothing", json=payload)
    response = client.post("/clothes/new_clothing", json=payload)

    assert response.status_code == 409


def test_get_all_clothes_returns_list(client):
    client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    client.post("/clothes/new_clothing", json={"name": "jean", "category": "Pantalons", "color": "Noir"})

    response = client.get("/clothes/")

    assert response.status_code == 200
    assert len(response.json()) == 2


def test_get_all_clothes_returns_empty_list(client):
    response = client.get("/clothes/")

    assert response.status_code == 200
    assert response.json() == []


# GET /item/{id}
def test_get_clothing_by_id_returns_200(client):
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    response = client.get(f"/clothes/item/{item_id}")

    assert response.status_code == 200
    assert response.json()["id"] == item_id
    assert response.json()["name"] == "t-shirt"


def test_get_clothing_by_id_not_found_returns_404(client):
    response = client.get("/clothes/item/99999")

    assert response.status_code == 404


# DELETE
def test_delete_clothing_returns_200(client):
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    response = client.delete(f"/clothes/item/{item_id}/delete")

    assert response.status_code == 200
    assert response.json()["id"] == item_id


def test_delete_clothing_removes_it_from_database(client):
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    client.delete(f"/clothes/item/{item_id}/delete")
    response = client.get(f"/clothes/item/{item_id}")

    assert response.status_code == 404


def test_delete_clothing_not_found_returns_404(client):
    response = client.delete("/clothes/item/99999/delete")

    assert response.status_code == 404


# PATCH
def test_update_clothing_returns_200(client):
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    response = client.patch(f"/clothes/item/{item_id}/update", json={"name": "t-shirt modifié"})

    assert response.status_code == 200
    assert response.json()["name"] == "t-shirt modifié"


def test_update_clothing_persists_in_database(client):
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    client.patch(f"/clothes/item/{item_id}/update", json={"name": "t-shirt modifié"})
    response = client.get(f"/clothes/item/{item_id}")

    assert response.json()["name"] == "t-shirt modifié"


def test_update_clothing_not_found_returns_404(client):
    response = client.patch("/clothes/item/99999/update", json={"name": "t-shirt modifié"})

    assert response.status_code == 404


def test_update_clothing_duplicate_name_returns_409(client):
    client.post("/clothes/new_clothing", json={"name": "t-shirt existant", "category": "Tops", "color": "Bleu"})
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    response = client.patch(f"/clothes/item/{item_id}/update", json={"name": "t-shirt existant"})

    assert response.status_code == 409


# IDOR - un utilisateur ne doit jamais accéder au vêtement d'un autre
def test_get_clothing_by_id_belonging_to_another_user_returns_404(client):
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    app.dependency_overrides[get_current_user] = lambda: {"sub": OTHER_USER_ID}
    response = client.get(f"/clothes/item/{item_id}")

    assert response.status_code == 404


def test_update_clothing_belonging_to_another_user_returns_404(client):
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    app.dependency_overrides[get_current_user] = lambda: {"sub": OTHER_USER_ID}
    response = client.patch(f"/clothes/item/{item_id}/update", json={"name": "vole"})

    assert response.status_code == 404


def test_delete_clothing_belonging_to_another_user_returns_404(client):
    created = client.post("/clothes/new_clothing", json={"name": "t-shirt", "category": "Tops", "color": "Bleu"})
    item_id = created.json()["id"]

    app.dependency_overrides[get_current_user] = lambda: {"sub": OTHER_USER_ID}
    response = client.delete(f"/clothes/item/{item_id}/delete")

    assert response.status_code == 404

    app.dependency_overrides[get_current_user] = lambda: {"sub": "00000000-0000-0000-0000-000000000001"}
    still_there = client.get(f"/clothes/item/{item_id}")
    assert still_there.status_code == 200
