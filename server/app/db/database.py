from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL= os.getenv('SUPABASE_URL')
SUPABASE_KEY= os.getenv('SUPABASE_KEY')

def get_supabase() -> Client:
    """
    Fonction de dépendance pour FastAPI
    Retourne un Client Supabase pour chaque requête
    """
    return create_client(SUPABASE_URL, SUPABASE_KEY)

# Test de connexion (optionnel, tu peux le supprimer après)
# if __name__ == "__main__":
#     supabase = get_supabase()
#     results = supabase.table('clothes').select('*').execute()
#     print(results)
