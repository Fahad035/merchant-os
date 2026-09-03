from sqlalchemy.orm import Session

from app.models.merchant import Merchant


DEMO_EMAIL = "fahadjdk345671@gmail.com"


def seed_merchant(db: Session) -> Merchant:
    """
    Use the existing demo merchant account.

    Sign up once using:
        fahadjdk345671@gmail.com

    All seeded data (products, customers, orders, campaigns,
    recommendations, etc.) will belong to this account.
    """

    merchant = (
        db.query(Merchant)
        .filter(Merchant.email == DEMO_EMAIL)
        .first()
    )

    if merchant is None:
        raise Exception(
            f"""
Demo merchant not found.

Please sign up first using:

Email: {DEMO_EMAIL}

Then run the seed again.
"""
        )

    print(f"✔ Using existing merchant: {merchant.business_name}")
    print(f"✔ Merchant ID: {merchant.id}")

    return merchant