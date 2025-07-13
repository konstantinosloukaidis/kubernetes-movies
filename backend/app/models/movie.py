from sqlmodel import SQLModel, Field
from typing import Optional

class Movie(Base):
    __tablename__ = "movie"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    poster_url = Column(String)

    saved_by = relationship("User", secondary=user_movies, back_populates="saved_movies")