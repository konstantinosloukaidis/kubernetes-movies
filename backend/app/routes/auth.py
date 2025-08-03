from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel

from app.models.models import User
from app.config import get_session
from app.auth.auth import get_current_user, get_user_by_username, get_password_hash, create_access_token, authenticate_user


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()

class RegisterRequet(BaseModel):
    username: str
    password: str

@router.post("/register", status_code = status.HTTP_201_CREATED)
def register_user(data: RegisterRequet, db: Session = Depends(get_session)):
    if get_user_by_username(db, data.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    
    hashed_password = get_password_hash(data.password)
    new_user = User(username=data.username, hashed_password=hashed_password)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User registered successfully", "username": new_user.username}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_session)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.username})
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return current_user