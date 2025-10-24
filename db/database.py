from supabase import create_client, Client

SUPABASE_URL=''
SUPABASE_KEY=''

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

results = supabase.table('clothes').select('*').execute()
print(results)