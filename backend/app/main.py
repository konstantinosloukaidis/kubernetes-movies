from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends

from app.routes import movies as moviesRouter
from app.routes import auth as authRouter
from app.config import get_session

from sqlmodel import Session, text

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

app.include_router(moviesRouter.router, 
                   prefix="/api/movies", 
                   tags=["Movies"])
app.include_router(authRouter.router, prefix="/api/auth", tags=["Auth"],)

# Check if the database connection is healthy
@app.get("/api/health")
def health_check(db: Session = Depends(get_session)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))