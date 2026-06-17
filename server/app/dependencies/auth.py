import os
import jwt
from jwt import PyJWKClient
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

_supabase_url = os.getenv("SUPABASE_URL", "").rstrip("/")
_jwks_client = PyJWKClient(f"{_supabase_url}/auth/v1/.well-known/jwks.json")


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    token = credentials.credentials
    legacy_secret = os.getenv("SUPABASE_JWT_SECRET")

    # Try JWKS first (new P-256 / ES256 keys)
    try:
        signing_key = _jwks_client.get_signing_key_from_jwt(token)
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256", "ES256"],
            audience="authenticated",
        )
        return payload
    except Exception:
        pass

    # Fallback: legacy HS256 secret
    if legacy_secret:
        try:
            payload = jwt.decode(
                token,
                legacy_secret,
                algorithms=["HS256"],
                audience="authenticated",
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expiré")
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail=f"Token invalide: {e}")

    raise HTTPException(status_code=401, detail="Token invalide")
