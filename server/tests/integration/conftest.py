import pytest
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session
from fastapi.testclient import TestClient
from main import app
from app.db.database import get_session
from app.dependencies.auth import get_current_user

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
    connection = test_engine.connect()
    transaction = connection.begin()
    s = Session(bind=connection, join_transaction_mode="create_savepoint")
    yield s
    s.close()
    transaction.rollback()
    connection.close()


@pytest.fixture()
def client(session):
    app.dependency_overrides[get_session] = lambda: session
    app.dependency_overrides[get_current_user] = lambda: {"sub": "test-user-id"}
    yield TestClient(app)
    app.dependency_overrides.clear()
