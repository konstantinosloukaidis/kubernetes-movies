from __future__ import annotations
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

class UserMovie(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    movie_id: int = Field(foreign_key="movie.id", primary_key=True)
    review: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=1, le=5)

    user: "User" = Relationship(back_populates="movies")
    movie: "Movie" = Relationship(back_populates="users")

