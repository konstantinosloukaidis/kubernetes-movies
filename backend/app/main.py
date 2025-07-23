from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routes import movies

from sqlmodel import Session, text
from config import get_session
from fastapi import Depends

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router, prefix="/api/movies", tags=["Movies"])

@app.get("/")
def root():
    return {"message": "MovieDB API is running!"}

@app.get("/health")
def health_check(db: Session = Depends(get_session)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))