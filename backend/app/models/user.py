from __future__ import annotations
from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship
from .user_movie import UserMovie


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)

    movies: List[UserMovie] = Relationship(back_populates="user")