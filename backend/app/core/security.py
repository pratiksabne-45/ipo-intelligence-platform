"""Security utilities — foundations only for this milestone."""

import hashlib
import secrets


def generate_secret_key(length: int = 32) -> str:
    """Generate a cryptographically secure random key."""
    return secrets.token_hex(length)


def hash_password(password: str) -> str:
    """Hash a password using SHA-256 (replace with bcrypt in production auth)."""
    return hashlib.sha256(password.encode()).hexdigest()
