from decimal import Decimal
from random import choice, randint, sample

from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product


ORDER_STATUSES = [
    "paid",
    "paid",
    "paid",
    "paid",
    "paid",
    "paid",
    "pending",
    "cancelled",
]


def seed_orders(
    db: Session,
    merchant_id,
    count: int = 400,
):

    existing = (
        db.query(Order)
        .filter(
            Order.merchant_id == merchant_id
        )
        .count()
    )

    if existing >= count:
        print("✓ Orders already seeded")
        return

    customers = (
        db.query(Customer)
        .filter(
            Customer.merchant_id == merchant_id
        )
        .all()
    )

    products = (
        db.query(Product)
        .filter(
            Product.merchant_id == merchant_id
        )
        .all()
    )

    if not customers or not products:
        print("Seed products and customers first.")
        return

    created = 0

    for i in range(count):

        customer = choice(customers)

        order = Order(
            merchant_id=merchant_id,
            customer_id=customer.id,
            order_number=f"ORD-{1001+i}",
            status=choice(ORDER_STATUSES),
            total_amount=Decimal("0"),
        )

        db.add(order)
        db.flush()

        total = Decimal("0")

        selected_products = sample(
            products,
            randint(1, min(4, len(products))),
        )

        for product in selected_products:

            qty = randint(1, 3)

            item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=qty,
                unit_price=product.price,
            )

            db.add(item)

            total += Decimal(product.price) * qty

            if product.stock >= qty:
                product.stock -= qty

        order.total_amount = total

        created += 1

    db.commit()

    print(f"✓ Seeded {created} orders")