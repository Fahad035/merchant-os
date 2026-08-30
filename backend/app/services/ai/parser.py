from typing import Any


class RecommendationParser:

    REQUIRED_FIELDS = (
        "title",
        "explanation",
        "action_type",
        "expected_revenue",
        "confidence",
        "risk_level",
        "requires_approval",
    )

    @classmethod
    def validate(
        cls,
        recommendations: list[Any],
    ) -> list[Any]:

        valid = []

        for recommendation in recommendations:

            if not isinstance(recommendation, dict):
                continue

            if not all(
                field in recommendation
                for field in cls.REQUIRED_FIELDS
            ):
                continue

            valid.append(recommendation)

        return valid