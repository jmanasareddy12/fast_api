from typing import Optional
from pydantic import BaseModel
from .job import JobResponse


class CompanyBase(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None


class CompanyCreate(CompanyBase):
    name: str
    email: str
    phone: str
    location: str


class CompanyUpdate(CompanyBase):
    pass


# Used for POST and PUT
class CompanySimpleResponse(CompanyBase):
    id: int

    class Config:
        from_attributes = True


# Used for GET requests
class CompanyResponse(CompanySimpleResponse):
    jobs: list[JobResponse] = []