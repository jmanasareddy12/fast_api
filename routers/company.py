from fastapi import APIRouter

router = APIRouter(prefix="/company", tags=["company"])

@router.get("/")
def read_company():
    return {"Company": "Company Root"}

@router.get("/id")
def read_company_id():
    return {"Company ID": "12345"}