from dotenv import load_dotenv
import os
from sqlmodel import create_engine, Session

load_dotenv()

ENV = os.getenv('ENV')
DATABASE_URL_PROD = os.getenv('DATABASE_URL_PROD')
DATABASE_LOCAL = os.getenv('DATABASE_LOCAL')

if ENV == 'dev':
    if not DATABASE_LOCAL:
        raise RuntimeError("DATABASE_LOCAL is not defined in the .env")
    engine = create_engine(DATABASE_LOCAL, echo=True)

elif ENV == 'prod':
    if not DATABASE_URL_PROD:
        raise RuntimeError("DATABASE_URL_PROD is not defined in the .env")
    engine = create_engine(DATABASE_URL_PROD, echo=True)


def get_session():
    with Session(engine) as session:
        yield session


DATABASE_URL_PROD = os.getenv('DATABASE_URL_PROD')
DATABASE_LOCAL = os.getenv('DATABASE_LOCAL')

if ENV == 'dev':
    if not DATABASE_LOCAL:
        raise RuntimeError("DATABASE_LOCAL non définie dans le .env")
    engine = create_engine(DATABASE_LOCAL, echo=True)

elif ENV == 'prod':
    if not DATABASE_URL_PROD:
        raise RuntimeError("DATABASE_URL_PROD non définie dans le .env")
    engine = create_engine(DATABASE_URL_PROD, echo=True)
