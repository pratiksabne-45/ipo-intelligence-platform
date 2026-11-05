"""Allotment endpoints — placeholder for milestone 2."""

from fastapi import APIRouter

router = APIRouter(tags=["allotments"])


@router.get("/allotments")
async def list_allotments():
    """Allotment data endpoint — to be implemented in milestone 2."""
    return {"message": "Allotment data coming soon", "data": []}
