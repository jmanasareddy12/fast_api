from fastapi import APIRouter, HTTPException, Depends, status
from schemas.company import (
    CompanyCreate,
    CompanyUpdate,
    CompanyResponse,
    CompanySimpleResponse,
)
from models.company import Company
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from database import get_db
from utils.oauth2 import role_required, get_current_user

router = APIRouter(prefix="/company", tags=["company"])


# ---------------- CREATE ----------------
@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=CompanySimpleResponse,
)
async def create_company(
    company: CompanyCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(role_required(["admin"])),
):
    try:
        db_company = Company(**company.dict())

        db.add(db_company)
        await db.commit()
        await db.refresh(db_company)

        return db_company

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Database error creating company: {str(e)}"
        )


# ---------------- GET ALL ----------------
@router.get(
    "/",
    response_model=list[CompanyResponse]
)
async def get_all_company(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        result = await db.execute(
            select(Company).options(selectinload(Company.jobs))
        )

        return result.scalars().all()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ---------------- GET ONE ----------------
@router.get(
    "/{company_id}",
    response_model=CompanyResponse,
)
async def get_company(
    company_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        result = await db.execute(
            select(Company)
            .options(selectinload(Company.jobs))
            .where(Company.id == company_id)
        )

        company = result.scalar_one_or_none()

        if not company:
            raise HTTPException(404, "Company not found")

        return company

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ---------------- UPDATE ----------------
@router.put(
    "/{company_id}",
    response_model=CompanySimpleResponse,
)
async def update_company(
    company_id: int,
    company: CompanyUpdate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(role_required(["admin"])),
):
    try:
        result = await db.execute(
            select(Company).where(Company.id == company_id)
        )

        db_company = result.scalar_one_or_none()

        if not db_company:
            raise HTTPException(404, "Company not found")

        for key, value in company.dict(exclude_unset=True).items():
            setattr(db_company, key, value)

        await db.commit()
        await db.refresh(db_company)

        return db_company

    except HTTPException:
        raise

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ---------------- DELETE ----------------
@router.delete(
    "/{company_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_company(
    company_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(role_required(["admin"])),
):
    try:
        result = await db.execute(
            select(Company).where(Company.id == company_id)
        )

        db_company = result.scalar_one_or_none()

        if not db_company:
            raise HTTPException(404, "Company not found")

        await db.delete(db_company)
        await db.commit()

    except HTTPException:
        raise

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )