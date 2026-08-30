import random
from uuid import UUID
from faker import Faker
from sqlalchemy.orm import Session

from app.models.conversation import Conversation
from app.models.message import Message
from app.models.merchant import Merchant

fake = Faker("en_IN")


QUESTIONS = [
    "How can I increase sales?",
    "Which products should I restock?",
    "Suggest a marketing campaign.",
    "How is my business performing?",
    "Show revenue insights.",
    "How can I improve conversions?",
    "Which products sell the most?",
    "Should I increase prices?",
    "Generate business recommendations.",
    "How can I reduce abandoned carts?",
]

ANSWERS = [
    "Consider bundle offers to increase average order value.",
    "Your running shoes are selling well. Consider restocking soon.",
    "Launch a weekend flash sale targeting previous customers.",
    "Revenue is increasing steadily with room for higher conversions.",
    "Your repeat customers generate significant revenue.",
    "Improve checkout flow and offer limited-time discounts.",
    "Sports accessories are strong cross-sell opportunities.",
    "Increase prices only on high-demand products.",
    "Focus on retaining existing customers using loyalty rewards.",
    "Email marketing can improve repeat purchases.",
]


def seed_conversations(
    db: Session,
    merchant_id: UUID,
):

    conversations = []

    for _ in range(30):

        question = random.choice(QUESTIONS)

        conversation = Conversation(
            merchant_id=merchant_id,
            title=question[:40],
        )

        db.add(conversation)
        db.flush()

        total_messages = random.randint(6, 12)

        for i in range(total_messages):

            if i % 2 == 0:

                content = random.choice(QUESTIONS)

                role = "user"

            else:

                content = random.choice(ANSWERS)

                role = "assistant"

            db.add(
                Message(
                    conversation_id=conversation.id,
                    role=role,
                    content=content,
                )
            )

        conversations.append(conversation)

    db.commit()

    print(f"✔ Seeded {len(conversations)} conversations")

    return conversations