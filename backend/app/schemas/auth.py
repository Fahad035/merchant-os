from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    business_name: str = Field(min_length=2, max_length=150)
    owner_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=20)
    industry: str = Field(min_length=2, max_length=100)
    password: str = Field(min_length=8, max_length=72)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


class MerchantOut(BaseModel):
    id: UUID
    business_name: str
    owner_name: str
    email: str
    industry: str

    model_config = {"from_attributes": True}