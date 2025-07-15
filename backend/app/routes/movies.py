from fastapi import APIRouter
from typing import Annotated

from sqlmodel import Session, select
from config import get_session
from fastapi import Depends, Query
from models.models import Movie

router = APIRouter()

@router.get("/", response_model=list[Movie])
def get_all_movies(
    db: Session = Depends(get_session),
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Movie]:
    movies = db.exec(select(Movie)).all()
    return movies

