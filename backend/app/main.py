from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router
from app.api.product import router as product_router
from app.api.dashboard import router as dashboard_router
from app.api.campaign import (
    router as campaign_router,
)

app = FastAPI(
    title="MerchantOS API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(product_router)
app.include_router(
    campaign_router
)
app.include_router(dashboard_router)



@app.get("/")
def root():
    return {
        "message": "MerchantOS API Running"
    }