from dotenv import load_dotenv
load_dotenv()

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from database.dependencies import get_db, get_current_user
from models.user_model import User
from schemas.user_schema import UserRegister
from auth.auth_handler import (
    hash_password,
    verify_password,
    create_access_token,
)

import os
import httpx

router = APIRouter(prefix="/auth", tags=["Auth"])


# ─── Standard Register ────────────────────────────────────────────────────────

@router.post("/register")
def register_user(request: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == request.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        username=request.username,
        email=request.email,
        password=hash_password(request.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}


# ─── Standard Login ───────────────────────────────────────────────────────────

@router.post("/login")
def login_user(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == request.username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email")
    if not user.password:
        raise HTTPException(
            status_code=401,
            detail="This account uses Google Sign-In. Please login with Google.",
        )
    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({"user_id": user.id, "email": user.email})
    return {"access_token": token, "token_type": "bearer"}


# ─── Get Current User ─────────────────────────────────────────────────────────

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "picture": current_user.picture,
        "is_google_user": current_user.is_google_user,
    }


# ─── Google OAuth ─────────────────────────────────────────────────────────────

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv(
    "GOOGLE_REDIRECT_URI", "http://127.0.0.1:8000/auth/google/callback"
)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"


@router.get("/google/login")
def google_login():
    """Redirect user to Google's OAuth consent screen."""
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=500,
            detail="Google OAuth is not configured. Set GOOGLE_CLIENT_ID in your .env",
        )
    params = (
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=openid%20email%20profile"
        f"&access_type=offline"
    )
    return RedirectResponse(GOOGLE_AUTH_URL + params)


@router.get("/google/callback")
async def google_callback(code: str, db: Session = Depends(get_db)):
    """Exchange code for token, upsert user, redirect to frontend with JWT."""
    # Exchange code for access token
    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            },
        )
        if token_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to exchange Google code")

        token_data = token_res.json()
        access_token = token_data.get("access_token")

        # Fetch user info from Google
        user_res = await client.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {access_token}"},
        )
        if user_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch Google user info")

        google_user = user_res.json()

    google_id = google_user.get("id")
    email = google_user.get("email")
    name = google_user.get("name", email.split("@")[0])
    picture = google_user.get("picture", "")

    # Upsert user: find by google_id or email
    user = db.query(User).filter(User.google_id == google_id).first()
    if not user:
        user = db.query(User).filter(User.email == email).first()

    if user:
        # Update Google fields if missing
        user.google_id = google_id
        user.picture = picture
        user.is_google_user = True
        db.commit()
        db.refresh(user)
    else:
        # Create new user from Google profile
        user = User(
            username=name,
            email=email,
            password=None,
            google_id=google_id,
            picture=picture,
            is_google_user=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # Issue JWT for this user
    jwt_token = create_access_token({"user_id": user.id, "email": user.email})

    # Redirect frontend with token in query param (frontend reads it from URL)
    return RedirectResponse(f"{FRONTEND_URL}/?token={jwt_token}")
