from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.seed.utils import (
    random_customer_name,
    random_email,
    random_phone,
)


def seed_customers(
    db: Session,
    merchant_id,
    count: int = 200,
):
    """
    Seed customers.
    """

    existing = (
        db.query(Customer)
        .filter(
            Customer.merchant_id == merchant_id
        )
        .count()
    )

    if existing >= count:
        print("✓ Customers already seeded")
        return

    customers = []

    for _ in range(count):

        name = random_customer_name()

        customer = Customer(
            merchant_id=merchant_id,
            full_name=name,
            email=random_email(name),
            phone=random_phone(),
        )

        customers.append(customer)

    db.add_all(customers)
    db.commit()

    print(f"✓ Seeded {len(customers)} customers")