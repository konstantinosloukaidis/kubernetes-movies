from fastapi import APIRouter
from typing import List

router = APIRouter()

# Temporary mock data
fake_movies = [
    {"id": 1, "title": "Inception"},
    {"id": 2, "title": "The Matrix"},
    {"id": 3, "title": "The Dark Knight"}
]

@router.get("/", response_model=List[dict])
def get_movies():
    return fake_movies

@router.post("/add")
def add_movie(movie: dict):
    fake_movies.append(movie)
    return {"message": "Movie added", "movie": movie}
