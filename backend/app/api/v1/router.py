"""API v1 router — aggregates all endpoint routers."""

from fastapi import APIRouter

from app.api.v1.endpoints import admin, allotments, gmp, health, ipos, subscriptions

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(ipos.router)
api_router.include_router(gmp.router)
api_router.include_router(subscriptions.router)
api_router.include_router(allotments.router)
api_router.include_router(admin.router)
