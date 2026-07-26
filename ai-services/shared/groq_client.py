from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_groq(messages: list[dict], model: str = "llama3-8b-8192", temperature: float = 0.7) -> str:
    """Wrapper around Groq API chat completions."""
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        max_tokens=1024,
    )
    return response.choices[0].message.content
