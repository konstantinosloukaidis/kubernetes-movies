from fastapi import FastAPI
from app.routes import movies

app = FastAPI()

app.include_router(movies.router, prefix="/api/movies", tags=["Movies"])

@app.get("/")
def root():
    return {"message": "MovieDB API is running!"}
