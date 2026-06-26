from fastapi import APIRouter

router = APIRouter(prefix="/job", tags=["job"])

@router.get("/")
def read_job():
    return {"Job": "Job Root"}

@router.get("/{job_id}")
def read_job_id(job_id: int):
    return {"Job ID": job_id}
