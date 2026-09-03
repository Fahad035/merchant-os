from app.database.session import SessionLocal

from app.models.audit_log import AuditLog
from app.models.campaign import Campaign
from app.models.conversation import Conversation
from app.models.customer import Customer
from app.models.message import Message
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.ai_recommendation import AIRecommendation
from app.models.merchant import Merchant

from app.seed.merchants import seed_merchant
from app.seed.products import seed_products
from app.seed.customers import seed_customers
from app.seed.orders import seed_orders
from app.seed.recommendations import seed_recommendations
from app.seed.campaigns import seed_campaigns
from app.seed.conversations import seed_conversations
from app.seed.audit_logs import seed_audit_logs


def main():

    db = SessionLocal()

    try:

        print("Clearing existing data...")

        db.query(Message).delete()
        db.query(Conversation).delete()
        db.query(AuditLog).delete()
        db.query(AIRecommendation).delete()
        db.query(Campaign).delete()
        db.query(OrderItem).delete()
        db.query(Order).delete()
        db.query(Customer).delete()
        db.query(Product).delete()
        # db.query(Merchant).delete()

        db.commit()

        print("Creating merchant...")

        merchant = seed_merchant(db)

        # IMPORTANT
        merchant_id = merchant.id

        print("Creating products...")
        products = seed_products(
            db,
            merchant_id,
        )

        print("Creating customers...")
        customers = seed_customers(
            db,
            merchant_id,
        )

        print("Creating orders...")
        orders = seed_orders(
            db,
            merchant_id,
            60,
        )

        print("Creating AI recommendations...")
        recommendations = seed_recommendations(
            db,
            merchant_id,
        )

        print("Creating campaigns...")
        campaigns = seed_campaigns(
            db,
            merchant_id,
        )

        print("Creating conversations...")
        conversations = seed_conversations(
            db,
            merchant_id,
        )

        print("Creating audit logs...")
        seed_audit_logs(
            db,
            merchant_id,
        )

        print("\n===================================")
        print("Database seeded successfully!")
        print("===================================")

    finally:
        db.close()


if __name__ == "__main__":
    main()