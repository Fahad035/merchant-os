from abc import ABC, abstractmethod

from app.models.ai_recommendation import AIRecommendation


class BaseAction(ABC):
    """
    Base class for every executable AI action.
    """

    def __init__(self, db):

        self.db = db

    @abstractmethod
    def execute(
        self,
        recommendation: AIRecommendation,
    ):
        """
        Execute the recommendation.
        """
        raise NotImplementedError