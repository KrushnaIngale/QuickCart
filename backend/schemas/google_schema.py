from pydantic import BaseModel

class GoogleAuthSchema(BaseModel):
    token: str