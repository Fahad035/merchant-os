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
    "pending",
    "cancelled",
]


def seed_orders(
    db: Session,
    merchant_id,
    count: int = 60,
):
    existing = (
        db.query(Order)
        .filter(Order.merchant_id == merchant_id)
        .count()
    )

    if existing >= count:
        print(f"✓ {existing} orders already exist.")
        return

    customers = (
        db.query(Customer)
        .filter(Customer.merchant_id == merchant_id)
        .all()
    )

    products = (
        db.query(Product)
        .filter(Product.merchant_id == merchant_id)
        .all()
    )

    if not customers:
        print("❌ No customers found.")
        return

    if not products:
        print("❌ No products found.")
        return

    created = 0

    for i in range(count):

        if i % 10 == 0:
            print(f"Creating order {i + 1}/{count}")

        customer = choice(customers)

        order = Order(
            merchant_id=merchant_id,
            customer_id=customer.id,
            order_number=f"ORD-{1001+i}",
            status=choice(ORDER_STATUSES),
            total_amount=Decimal("0"),
        )

        db.add(order)
        db.flush()  # Needed only to get order.id

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

            total += Decimal(str(product.price)) * qty

            if product.stock >= qty:
                product.stock -= qty

        order.total_amount = total
        created += 1

        # Commit every 20 orders
        if created % 20 == 0:
            db.commit()
            print(f"✓ {created} orders committed")

    db.commit()

    print("===================================")
    print(f"✓ Successfully seeded {created} orders")
    print("===================================")