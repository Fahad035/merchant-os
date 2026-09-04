import json

from google import genai
from google.genai import types

from app.core.config import settings


class LLMService:

    MODEL = "gemini-2.5-flash"

    def __init__(self):

        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    # ----------------------------------------------------

    def generate_text(
        self,
        prompt: str,
    ) -> str:

        response = self.client.models.generate_content(
            model=self.MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.5,
            ),
        )

        if response is None:
            return ""

        if getattr(response, "text", None):
            return response.text.strip()

        return ""

    # ----------------------------------------------------

    def generate_json(
        self,
        prompt: str,
    ):

        response = self.client.models.generate_content(
            model=self.MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.3,
                response_mime_type="application/json",
            ),
        )

        if response is None:
            return {}

        if not getattr(response, "text", None):
            return {}

        return json.loads(response.text)

    # ----------------------------------------------------

    def ask(
        self,
        prompt: str,
        json_mode: bool = False,
    ):

        if json_mode:
            return self.generate_json(prompt)

        return self.generate_text(prompt)