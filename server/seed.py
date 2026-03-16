"""
Script de seed pour peupler la base de données locale avec des données de test.

Usage:
    cd server
    python seed.py
"""

from sqlmodel import Session, select
from app.db.database import engine, create_db_and_tables
from app.models.users import Users
from app.models.brands import Brands
from app.models.clothes import Clothes
from app.models.tags import Tags
from app.models.tags_clothes import Tags_Clothes


def seed_users(session: Session):
    existing = session.exec(select(Users)).first()
    if existing:
        print("Users already seeded, skipping.")
        return

    users = [
        Users(pseudo="Majda", password="password123", email="majda@test.com"),
        Users(pseudo="Gwen", password="password123", email="gwen@test.com"),
    ]
    for user in users:
        session.add(user)
    session.commit()
    print(f"  {len(users)} users created.")


def seed_brands(session: Session):
    existing = session.exec(select(Brands)).first()
    if existing:
        print("Brands already seeded, skipping.")
        return

    brands = [
        Brands(name="Zara", category="Fast fashion"),
        Brands(name="H&M", category="Fast fashion"),
        Brands(name="Sandro", category="Premium"),
        Brands(name="Uniqlo", category="Basics"),
        Brands(name="Nike", category="Sport"),
    ]
    for brand in brands:
        session.add(brand)
    session.commit()
    print(f"  {len(brands)} brands created.")


def seed_clothes(session: Session):
    existing = session.exec(select(Clothes)).first()
    if existing:
        print("Clothes already seeded, skipping.")
        return

    clothes = [
        Clothes(
            category="Robes", size="M", status="Propre", style="Chic",
            brand_id=1, user_id=1, season="Été", note=8,
            materials="Coton", comment="Ma robe d'été préférée",
            picture="robe_ete.jpg", color="Bleu", name="Robe bleue d'été"
        ),
        Clothes(
            category="Pantalons", size="S", status="Propre", style="Casual",
            brand_id=4, user_id=1, season="Automne", note=7,
            materials="Coton", comment="Jean classique",
            picture="jean.jpg", color="Bleu", name="Jean slim"
        ),
        Clothes(
            category="T-shirt", size="M", status="Sale", style="Streetwear",
            brand_id=5, user_id=1, season="Été", note=6,
            materials="Coton", comment="T-shirt de sport",
            picture="tshirt_nike.jpg", color="Noir", name="T-shirt Nike"
        ),
        Clothes(
            category="Vestes", size="M", status="Propre", style="Classique",
            brand_id=3, user_id=1, season="Automne", note=9,
            materials="Laine", comment="Veste de mi-saison",
            picture="veste_sandro.jpg", color="Beige", name="Veste Sandro"
        ),
        Clothes(
            category="Pulls", size="L", status="Propre", style="Bohème",
            brand_id=2, user_id=2, season="Hiver", note=7,
            materials="Laine", comment="Pull chaud pour l'hiver",
            picture="pull_hm.jpg", color="Blanc", name="Pull oversize"
        ),
        Clothes(
            category="Jupes", size="S", status="Propre", style="Vintage",
            brand_id=1, user_id=2, season="Printemps", note=8,
            materials="Lin", comment="Jupe midi fleurie",
            picture="jupe_zara.jpg", color="Rose", name="Jupe midi"
        ),
        Clothes(
            category="Blazers", size="M", status="Propre", style="Chic",
            brand_id=3, user_id=1, season="Printemps", note=10,
            materials="Polyester", comment="Mon blazer préféré pour le bureau",
            picture="blazer.jpg", color="Noir", name="Blazer noir"
        ),
    ]
    for clothe in clothes:
        session.add(clothe)
    session.commit()
    print(f"  {len(clothes)} clothes created.")


def seed_tags(session: Session):
    existing = session.exec(select(Tags)).first()
    if existing:
        print("Tags already seeded, skipping.")
        return

    tags = [
        Tags(name="Favoris", color="#e74c3c", by_default=True, user_id=None),
        Tags(name="Travail", color="#3498db", by_default=True, user_id=None),
        Tags(name="Week-end", color="#2ecc71", by_default=True, user_id=None),
        Tags(name="Soirée", color="#9b59b6", by_default=True, user_id=None),
        Tags(name="Sport", color="#e67e22", by_default=True, user_id=None),
        Tags(name="A donner", color="#95a5a6", by_default=False, user_id=1),
        Tags(name="Tenue du lundi", color="#1abc9c", by_default=False, user_id=1),
    ]
    for tag in tags:
        session.add(tag)
    session.commit()
    print(f"  {len(tags)} tags created.")


def seed_tags_clothes(session: Session):
    existing = session.exec(select(Tags_Clothes)).first()
    if existing:
        print("Tags_Clothes already seeded, skipping.")
        return

    associations = [
        Tags_Clothes(tag_id=1, clothe_id=1, user_id=1),  # Robe bleue -> Favoris
        Tags_Clothes(tag_id=3, clothe_id=1, user_id=1),  # Robe bleue -> Week-end
        Tags_Clothes(tag_id=2, clothe_id=7, user_id=1),  # Blazer noir -> Travail
        Tags_Clothes(tag_id=1, clothe_id=4, user_id=1),  # Veste Sandro -> Favoris
        Tags_Clothes(tag_id=5, clothe_id=3, user_id=1),  # T-shirt Nike -> Sport
        Tags_Clothes(tag_id=7, clothe_id=7, user_id=1),  # Blazer noir -> Tenue du lundi
        Tags_Clothes(tag_id=7, clothe_id=2, user_id=1),  # Jean slim -> Tenue du lundi
    ]
    for assoc in associations:
        session.add(assoc)
    session.commit()
    print(f"  {len(associations)} tag-clothe associations created.")


def main():
    print("Creating tables...")
    create_db_and_tables()

    print("\nSeeding database...")
    with Session(engine) as session:
        seed_users(session)
        seed_brands(session)
        seed_clothes(session)
        seed_tags(session)
        seed_tags_clothes(session)

    print("\nSeed completed!")


if __name__ == "__main__":
    main()
