from pydantic import BaseModel

class MovieWithRatingDTO(BaseModel):
    id: int
    name: str
    release_year: int
    duration: int
    average_rating: float
