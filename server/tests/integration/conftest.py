import pytest
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session
from fastapi.testclient import TestClient
from main import app
from app.db.database import get_session

load_dotenv()

DATABASE_TEST = os.getenv("DATABASE_TEST")
if not DATABASE_TEST:
    raise RuntimeError("DATABASE_TEST is not defined in the .env")

test_engine = create_engine(DATABASE_TEST, echo=False)


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    SQLModel.metadata.create_all(test_engine)
    yield
    SQLModel.metadata.drop_all(test_engine)


@pytest.fixture()
def session():
    with Session(test_engine) as s:
        yield s
        s.rollback()


@pytest.fixture()
def client(session):
    app.dependency_overrides[get_session] = lambda: session
    yield TestClient(app)
    app.dependency_overrides.clear()
