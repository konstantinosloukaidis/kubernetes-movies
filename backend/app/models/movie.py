from __future__ import annotations
from typing import TYPE_CHECKING, List, Optional
from sqlmodel import SQLModel, Field, Relationship


class Movie(SQLModel, table=True):
    __tablename__ = "movies"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    release_year: int
    duration: int

    # user_movies: List["UserMovie"] = Relationship(back_populates="movie")
    # users: List["User"] = Relationship(back_populates="movies", link_model=UserMovie)
