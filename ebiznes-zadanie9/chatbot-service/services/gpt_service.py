import os
import openai
from dotenv import load_dotenv

load_dotenv()

class GPTService:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        if not openai.api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")

    def get_response(self, message):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": message}
                ],
                max_tokens=150,
                temperature=0.7
            )
            return response.choices[0].message["content"].strip()
        except Exception as e:
            print(f"Error getting response from OpenAI: {e}")
            raise Exception(f"Failed to get response from ChatGPT: {e}")