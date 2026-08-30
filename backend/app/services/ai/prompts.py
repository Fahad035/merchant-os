from typing import Any


class PromptBuilder:
    """
    Builds prompts for every AI feature.

    Future:
        - Recommendations
        - Campaign Generator
        - Pricing
        - Inventory
        - Forecasting
        - AI Chat
    """

    @staticmethod
    def recommendation_prompt(
        merchant_name: str,
        products: list[Any],
        orders: list[Any],
    ) -> str:

        product_lines = []

        for product in products:
            product_lines.append(
                f"""
Product:
Name: {product.name}
Price: {product.price}
Stock: {product.stock}
Category: {product.category}
"""
            )

        order_lines = []

        for order in orders:

            order_lines.append(
                f"""
Order:
ID: {order.id}
Total: {order.total_amount}
Items:
"""
            )

            for item in order.items:

                order_lines.append(
                    f"- {item.product.name} x {item.quantity}"
                )

        product_text = "\n".join(product_lines)

        order_text = "\n".join(order_lines)

        return f"""
You are an expert AI Commerce Consultant.

Your job is to help merchants increase revenue.

Merchant Name:
{merchant_name}

----------------------------------
PRODUCT CATALOG
----------------------------------

{product_text}

----------------------------------
RECENT ORDERS
----------------------------------

{order_text}

----------------------------------
YOUR TASK
----------------------------------

Analyze the merchant data.

Generate exactly FIVE business recommendations.

Recommendations may include:

- Bundle opportunities
- Cross sell
- Upsell
- Pricing improvements
- Inventory improvements
- Marketing campaigns

Return ONLY valid JSON.

Schema:

[
  {{
    "title": "...",
    "explanation": "...",
    "action_type": "...",
    "expected_revenue": 25000,
    "confidence": 90,
    "risk_level": "low",
    "requires_approval": true
  }}
]

Rules:

- confidence must be between 0 and 100
- risk_level must be low, medium or high
- expected_revenue must be numeric
- title under 100 characters
- explanation under 250 characters

Do not include markdown.
Do not include code fences.
Return JSON only.
"""

    @staticmethod
    def campaign_prompt(
    merchant_name: str,
    goal: str,
    products: list,
    orders: list,
) -> str:

        products_text = "\n".join(
            [
                f"{p.name} | Price: {p.price} | Stock: {p.stock}"
                for p in products
            ]
        )

        return f"""
You are an expert Ecommerce Marketing Strategist.

Merchant:
{merchant_name}

Campaign Goal:
{goal}

Products:

{products_text}

Generate ONE complete marketing campaign.

Return ONLY valid JSON.

Schema:

{{
    "title":"",
    "description":"",
    "audience":"",
    "discount":"",
    "duration":"",
    "marketing_copy":"",
    "expected_revenue":0,
    "confidence":0
}}

Rules:

- confidence between 0 and 100
- expected_revenue numeric
- marketing_copy under 200 characters
- no markdown
- JSON only
"""

    @staticmethod
    def chat_prompt(
        merchant_name: str,
        question: str,
        products: list,
        orders: list,
        recommendations: list,
    ) -> str:

        product_text = "\n".join(
            [
                f"- {p.name} | Price: {p.price} | Stock: {p.stock}"
                for p in products
            ]
        )

        order_text = "\n".join(
            [
                f"- Order {o.id} | Total: {o.total_amount}"
                for o in orders
            ]
        )

        recommendation_text = "\n".join(
            [
                f"- {r.title}"
                for r in recommendations
            ]
        )

        return f"""
You are MerchantOS AI.

You are an Ecommerce Business Consultant.

Merchant:
{merchant_name}

Products

{product_text}

Orders

{order_text}

AI Recommendations

{recommendation_text}

Merchant Question

{question}

Instructions:

- Give professional business advice.
- Use only merchant data.
- Keep answers under 300 words.
- Use bullet points whenever possible.
- Never invent products.
"""