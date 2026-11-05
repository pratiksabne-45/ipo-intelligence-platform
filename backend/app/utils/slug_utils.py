"""Slug generation for IPO company names."""

import re
import unicodedata


def slugify(text: str) -> str:
    """Convert a company name to a URL-safe slug."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


def normalize_company_name(name: str) -> str:
    """Normalize company name for deduplication comparison."""
    name = name.upper().strip()
    for suffix in ["LIMITED", "LTD", "PRIVATE", "PVT", "LLP", ".", ","]:
        name = name.replace(suffix, "")
    return re.sub(r"\s+", " ", name).strip()
