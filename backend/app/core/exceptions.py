"""Custom application exceptions."""

from fastapi import Request
from fastapi.responses import JSONResponse


class IPOIntelligenceError(Exception):
    """Base application error."""

    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class NotFoundError(IPOIntelligenceError):
    def __init__(self, resource: str):
        super().__init__(f"{resource} not found", status_code=404)


class ValidationError(IPOIntelligenceError):
    def __init__(self, detail: str):
        super().__init__(detail, status_code=422)


async def app_exception_handler(
    request: Request, exc: IPOIntelligenceError
) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message, "error_type": type(exc).__name__},
    )
