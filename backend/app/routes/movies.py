from fastapi import APIRouter, HTTPException
from fastapi import Depends, Query
from typing import Annotated

from sqlmodel import Session, select
from sqlalchemy import func
from sqlmodel import Session, select

from app.config import get_session
from pydantic import BaseModel

from app.dtos.MovieRatingDto import MovieWithRatingDTO
from app.config import get_session
from app.models.models import Movie, UserMovie
from app.auth.auth import get_current_user
from app.models.models import User, Movie, UserMovie

router = APIRouter()

# Gets info for a specific movie by its ID
@router.get("/{movie_id}", response_model=Movie)
def get_movie_by_id(
    movie_id: int,
    db: Session = Depends(get_session),
) -> Movie:
    movie = db.get(Movie, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

# Adds or updates a movie with the given id
@router.post("/{movie_id}", response_model=Movie)
def create_or_update_movie(
    movie_id: int,
    movie: Movie,
    db: Session = Depends(get_session),
) -> Movie:
    existing_movie = db.get(Movie, movie_id)
    if existing_movie:
        # Update fields of the existing movie
        existing_movie.name = movie.name
        existing_movie.release_year = movie.release_year
        existing_movie.duration = movie.duration
        db.add(existing_movie)
        db.commit()
        db.refresh(existing_movie)
        return existing_movie
    else:
        # Create a new movie with the given id
        movie.id = movie_id
        db.add(movie)
        db.commit()
        db.refresh(movie)
        return movie

# Returns all movies with their average ratings
@router.get("/", response_model=list[MovieWithRatingDTO])
def get_all_user_movies(
    db: Session = Depends(get_session),
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    average_rating = func.avg(UserMovie.rating).label("average_rating")
    statement = (
        select(
            Movie.id,
            Movie.name,
            Movie.release_year,
            Movie.duration,
            average_rating
        )
        .join(UserMovie, UserMovie.movie_id == Movie.id)
        .group_by(Movie.id)
        .order_by(average_rating.desc())
        .offset(offset)
        .limit(limit)
    )

    results = db.exec(statement).all()

    return [
        MovieWithRatingDTO(
            id=id,
            name=name,
            release_year=release_year,
            duration=duration,
            average_rating=float(avg_rating) if avg_rating is not None else 0.0
        )
        for id, name, release_year, duration, avg_rating in results
    ]

class RatingRequest(BaseModel):
    rating: float
    review: str = ""

@router.post("/review/{movie_id}")
def add_rating(
    movie_id: int,
    payload: RatingRequest,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    
    if current_user is None:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user_movie = db.exec(
        select(UserMovie).where(
            UserMovie.movie_id == movie_id, UserMovie.user_id == current_user.id
        )
    ).first()

    print("Payload:", payload)

    if user_movie:
        user_movie.rating = payload.rating
        user_movie.review = payload.review
        db.add(user_movie)
    else:
        user_movie = UserMovie(movie_id=movie_id, user_id=current_user.id, rating=payload.rating, review=payload.review)
        db.add(user_movie)

    db.commit()
    db.refresh(user_movie)

    return {"message": "Rating added successfully"}

@router.get("/review/{movie_id}")
def user_rating(
    movie_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> UserMovie:
    if current_user is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_movie = db.exec(
        select(UserMovie).where(
            UserMovie.movie_id == movie_id,
            UserMovie.user_id == current_user.id
        )
    ).first()
    
    if not user_movie:
        raise HTTPException(status_code=404, detail="No rating found for this movie")
    return user_movie

