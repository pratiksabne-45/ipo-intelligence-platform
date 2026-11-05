"""Admin endpoints — authentication foundations only."""

from fastapi import APIRouter

router = APIRouter(tags=["admin"])


@router.get("/admin/status")
async def admin_status():
    """Admin panel status — full authentication to be implemented."""
    return {"message": "Admin API — authentication required", "auth_implemented": False}
