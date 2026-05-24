from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends
from database.dependencies import get_db
from models.user_model import User
from schemas.user_schema import UserRegister
from auth.auth_handler import hash_password
from fastapi import HTTPException

from schemas.user_schema import UserLogin
from auth.auth_handler import (
    verify_password,
    create_access_token
)

from database.dependencies import (
    get_current_user
)
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/register")
def register_user(
    request: UserRegister,
    db: Session = Depends(get_db)
):

    hashed_password = hash_password(
        request.password
    )

    new_user = User(
        username=request.username,
        email=request.email,
        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message":"User registered successfully"
    }





@router.post("/login")
def login_user(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == request.username
    ).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )
    password_match = verify_password(
        request.password,
        user.password
    )
    if not password_match:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )
    token = create_access_token(
        {
            "user_id": user.id,
            "email": user.email
        }
    )
    return {
        "access_token": token,
        "token_type": "bearer"
    }



@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }