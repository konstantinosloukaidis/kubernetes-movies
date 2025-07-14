from __future__ import annotations
from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship
from .user_movie import UserMovie


class Movie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    release_year: int
    duration: int

    users: List[UserMovie] = Relationship(back_populates="movie")
