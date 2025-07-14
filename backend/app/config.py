import os
from dotenv import load_dotenv
from sqlmodel import create_engine, Session

ENV = os.getenv("ENV", "db")
env_file = f".env.{ENV}"
load_dotenv(env_file)

DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_NAME = os.getenv("POSTGRES_DB")
DB_HOST = os.getenv("POSTGRES_HOST")
DB_PORT = os.getenv("DB_PORT")
APP_PORT = os.getenv("APP_PORT", "8000")

DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
def get_session():
    with Session(engine) as session:
        yield session
