from fastapi import FastAPI
from app.routers.clothes_router import router as clothes_router 
from app.routers.tags_router import router as tags_router 
from app.routers.tags_clothes_router import router as tags_clothes_router
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Startup")
    yield
    print("Shutdown")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://thevirtualcloset.netlify.app"],
    allow_origin_regex=r"https://.*--the-virtual-closet\.netlify\.app",
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clothes_router)
app.include_router(tags_router)
app.include_router(tags_clothes_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
