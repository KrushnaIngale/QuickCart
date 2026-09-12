from sqlalchemy import Column, Integer, String, Boolean
from database.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=True)   # nullable for Google-only users

    # Google OAuth fields
    google_id = Column(String, unique=True, nullable=True, index=True)
    picture = Column(String, nullable=True)    # Google profile picture URL
    is_google_user = Column(Boolean, default=False)
