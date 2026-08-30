from uuid import uuid4

from sqlalchemy.orm import Session

from app.repositories.merchant_repository import MerchantRepository
from app.repositories.order_repository import OrderRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.recommendation_repository import (
    RecommendationRepository,
)

from app.models.ai_recommendation import AIRecommendation

from app.services.ai.llm_service import LLMService
from app.services.ai.parser import RecommendationParser
from app.services.ai.prompts import PromptBuilder


class RecommendationService:

    def __init__(self, db: Session):

        self.db = db

        self.products = ProductRepository(db)
        self.orders = OrderRepository(db)
        self.merchants = MerchantRepository(db)
        self.recommendations = RecommendationRepository(db)

        self.llm = LLMService()

    # --------------------------------------------------------

    def generate(
        self,
        merchant_id,
    ):

        merchant = self.merchants.get(merchant_id)

        products = self.products.get_by_merchant(
            merchant_id
        )

        orders = self.orders.get_by_merchant(
            merchant_id
        )

        prompt = PromptBuilder.recommendation_prompt(
            merchant_name=merchant.name,
            products=products,
            orders=orders,
        )

        ai_output = self.llm.ask(
            prompt,
            json_mode=True,
        )

        ai_output = RecommendationParser.validate(
            ai_output
        )

        self.recommendations.delete_pending_by_merchant(
            merchant_id
        )

        saved = []

        for item in ai_output:

            recommendation = AIRecommendation(

                merchant_id=merchant_id,

                action_id=str(uuid4()),

                title=item["title"],

                explanation=item["explanation"],

                action_type=item["action_type"],

                expected_revenue=item["expected_revenue"],

                confidence=item["confidence"],

                risk_level=item["risk_level"],

                requires_approval=item["requires_approval"],

                status="pending",
            )

            self.db.add(recommendation)

            saved.append(recommendation)

        self.db.commit()

        for rec in saved:
            self.db.refresh(rec)

        return saved