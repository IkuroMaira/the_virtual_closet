from dotenv import load_dotenv
import os
from sqlmodel import SQLModel, create_engine, Session

load_dotenv()

ENV = os.getenv('ENV')
DATABASE_URL_PROD = os.getenv('DATABASE_URL_PROD')
DATABASE_LOCAL = os.getenv('DATABASE_LOCAL')

if ENV == 'dev':
    engine = create_engine(DATABASE_LOCAL, echo=True)

    # Function to create database tables from SQLModel classes
    def create_db_and_tables():
        SQLModel.metadata.create_all(engine)

elif ENV == 'prod':
    engine = create_engine(DATABASE_URL_PROD, echo=True)

def get_session():
    with Session(engine) as session:
        yield session
