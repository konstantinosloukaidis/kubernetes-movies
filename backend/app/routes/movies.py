from fastapi import APIRouter, HTTPException
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

@router.get("/{movie_id}", response_model=Movie)
def get_movie_by_id(
    movie_id: int,
    db: Session = Depends(get_session),
) -> Movie:
    movie = db.get(Movie, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@router.post("/{movie_id}", response_model=Movie)
def update_movie(
    movie_id: int,
    movie: Movie,
    db: Session = Depends(get_session),
) -> Movie:
    existing_movie = db.get(Movie, movie_id)
    if not existing_movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    movie.id = movie_id
    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie

@router.delete("/{movie_id}", response_model=Movie)
def delete_movie(
    movie_id: int,
    db: Session = Depends(get_session),
) -> Movie:
    movie = db.get(Movie, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    db.delete(movie)
    db.commit()
    return movie
