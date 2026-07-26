"""Generates viva questions using Groq LLM based on experiment topic."""

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.groq_client import call_groq
import json

def generate_questions(topic: str, code: str | None = None, num_questions: int = 5) -> dict:
    code_context = f"\n\nStudent's code:\n```\n{code}\n```" if code else ""
    messages = [
        {
            "role": "system",
            "content": (
                "You are an examiner for a computer science lab. Generate viva questions in JSON format. "
                "Return a JSON object with a 'questions' array. Each question has 'question' and 'expected_keywords' fields."
            ),
        },
        {
            "role": "user",
            "content": f"Generate {num_questions} viva questions for the topic: {topic}{code_context}",
        },
    ]
    raw = call_groq(messages, temperature=0.8)
    try:
        data = json.loads(raw)
        return data
    except json.JSONDecodeError:
        return {"questions": [{"question": raw, "expected_keywords": []}]}
