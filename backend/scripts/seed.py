from decimal import Decimal

from app.core.database import SessionLocal
from app.models.ai_recommendation import AIRecommendation
from app.models.customer import Customer
from app.models.merchant import Merchant
from app.models.order import Order
from app.models.product import Product


def seed():
    db = SessionLocal()

    if db.query(Merchant).first():
        print("Database already contains data.")
        db.close()
        return

    merchant = Merchant(
        business_name="SportZone India",
        owner_name="Rahul Sharma",
        email="owner@sportzone.in",
        phone="+919876543210",
        industry="Sports & Fitness",
    )

    db.add(merchant)
    db.flush()

    shoes = Product(
        merchant_id=merchant.id,
        name="Running Shoes",
        sku="RS-001",
        description="Premium running shoes",
        price=Decimal("2999.00"),
        stock=120,
        category="Footwear",
    )

    socks = Product(
        merchant_id=merchant.id,
        name="Sports Socks",
        sku="SS-001",
        description="Comfort sports socks",
        price=Decimal("299.00"),
        stock=300,
        category="Accessories",
    )

    db.add_all([shoes, socks])
    db.flush()

    customer = Customer(
        merchant_id=merchant.id,
        full_name="Amit Kumar",
        email="amit@example.com",
        phone="+919900000001",
    )

    db.add(customer)
    db.flush()

    order = Order(
        merchant_id=merchant.id,
        customer_id=customer.id,
        order_number="ORD-1001",
        status="completed",
        total_amount=Decimal("3298.00"),
    )

    db.add(order)

    recommendation = AIRecommendation(
        merchant_id=merchant.id,
        action_id="ACT-001",
        title="Bundle Opportunity",
        explanation="Customers buying Running Shoes often purchase Sports Socks.",
        action_type="bundle",
        expected_revenue=Decimal("18000.00"),
        confidence=92,
        risk_level="Low",
        requires_approval=True,
        status="pending",
    )

    db.add(recommendation)

    db.commit()
    db.close()

    print("✅ Seed data inserted successfully.")


if __name__ == "__main__":
    seed()