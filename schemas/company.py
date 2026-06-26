from typing import Optional
from pydantic import BaseModel

class CompanyCreate(BaseModel):
    name: str
    location: str

class CompanyUpdate(BaseModel):
    name: Optional[str]   = None
    location: Optional[str] = None