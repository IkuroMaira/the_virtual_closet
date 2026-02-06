from fastapi import FastAPI
from app.routers.clothes_router import router as clothes_router
from app.routers.tags_router import router as tags_router

app = FastAPI()
app.include_router(clothes_router)
app.include_router(tags_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
