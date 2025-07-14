# from __future__ import annotations
# from typing import Optional
# from sqlmodel import SQLModel, Field, Relationship

# from .user_movie import UserMovie
# # from .movie import Movie

# class User(SQLModel, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     username: str = Field(index=True, unique=True)

#     movies: list["Movie"] = Relationship(back_populates="users", link_model=UserMovie)