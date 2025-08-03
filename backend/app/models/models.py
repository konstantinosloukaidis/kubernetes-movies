from sqlmodel import SQLModel, Field, Relationship

class UserMovie(SQLModel, table=True):
    __tablename__ = "user_movies"
    user_id: int | None = Field(foreign_key="users.id", primary_key=True)
    movie_id: int | None = Field(foreign_key="movies.id", primary_key=True)
    review: str | None = Field(default=None, max_length=500)
    rating: int | None = Field(default=None, ge=1, le=5)

class Movie(SQLModel, table=True):
    __tablename__ = "movies"
    id: int | None = Field(default=None, primary_key=True)
    name: str
    release_year: int
    duration: int

    users: list["User"] = Relationship(back_populates="movies", link_model=UserMovie)

class User(SQLModel, table=True):
    __tablename__ = "users"
    id: int | None = Field(default=None, primary_key=True)
    username: str | None = Field(index=True, unique=True)
    hashed_password: str | None = Field()
    admin_user: bool = Field(default=False)

    movies: list["Movie"] = Relationship(back_populates="users", link_model=UserMovie)




