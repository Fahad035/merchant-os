from faker import Faker
from sqlalchemy.orm import Session

from app.models.merchant import Merchant

fake = Faker("en_IN")


INDUSTRIES = [
    "Sports & Fitness",
    "Fashion",
    "Electronics",
    "Furniture",
    "Books",
    "Beauty",
    "Food",
    "Healthcare",
]


def seed_merchant(db: Session) -> Merchant:
    merchant = Merchant(
        business_name=fake.company(),
        owner_name=fake.name(),
        email=fake.unique.email(),
        phone=fake.msisdn()[:10],
        industry=fake.random_element(INDUSTRIES),
    )

    db.add(merchant)
    db.commit()
    db.refresh(merchant)

    print(f"✔ Seeded Merchant: {merchant.business_name}")

    return merchant