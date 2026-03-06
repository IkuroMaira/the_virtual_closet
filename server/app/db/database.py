from dotenv import load_dotenv
import os
from sqlmodel import create_engine, Session

load_dotenv()

ENV = os.getenv('ENV')
DATABASE_URL_PROD = os.getenv('DATABASE_URL_PROD')
DATABASE_LOCAL = os.getenv('DATABASE_LOCAL')

if ENV == 'dev':
    engine = create_engine(DATABASE_LOCAL, echo=True)

elif ENV == 'prod':
    engine = create_engine(DATABASE_URL_PROD, echo=True)

def get_session():
    with Session(engine) as session:
        yield session
