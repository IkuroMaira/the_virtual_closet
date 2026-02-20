from fastapi import FastAPI
from app.routers.clothes_router import router as clothes_router 
from app.routers.tags_router import router as tags_router 
from contextlib import asynccontextmanager
from app.db.database import ENV

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Startup")
    if ENV == 'dev':
        from app.db.database import create_db_and_tables
        create_db_and_tables()
        print('Tables created in local database')
    yield
    print("Shutdown")

app = FastAPI(lifespan=lifespan)

app.include_router(clothes_router)
app.include_router(tags_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
