from dotenv import load_dotenv
""" from supabase import create_client, Client """
import os
from sqlmodel import create_engine, Session

load_dotenv()

""" load_dotenv()

SUPABASE_URL= os.getenv('SUPABASE_URL')
SUPABASE_KEY= os.getenv('SUPABASE_KEY')

def get_supabase() -> Client:
    
    Fonction de dépendance pour FastAPI
    Retourne un Client Supabase pour chaque requête
    
    return create_client(SUPABASE_URL, SUPABASE_KEY)
 """
# Test de connexion (optionnel, tu peux le supprimer après)
# if __name__ == "__main__":
#     supabase = get_supabase()
#     results = supabase.table('clothes').select('*').execute()
#     print(results)

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session