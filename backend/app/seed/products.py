from decimal import Decimal
from random import randint
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.product import Product
from app.seed.utils import random_product


def seed_products(
    db: Session,
    merchant_id: UUID,
    count: int = 50,
):
    """
    Seed realistic sports products.
    """

    existing = (
        db.query(Product)
        .filter(Product.merchant_id == merchant_id)
        .count()
    )

    if existing >= count:
        print("✓ Products already seeded")
        return (
            db.query(Product)
            .filter(Product.merchant_id == merchant_id)
            .all()
        )

    products = []

    for i in range(count):

        name, category = random_product()

        products.append(
            Product(
                merchant_id=merchant_id,
                name=name,
                sku=f"SKU-{category[:3].upper()}-{i+1:04d}",
                description=f"Premium quality {name.lower()} for professional athletes and fitness enthusiasts.",
                price=Decimal(randint(299, 9999)),
                stock=randint(20, 300),
                category=category,
            )
        )

    db.add_all(products)
    db.commit()

    print(f"✓ Seeded {len(products)} products")

    return products