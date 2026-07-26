"""Evaluates student viva answers using keyword matching + LLM scoring."""

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.groq_client import call_groq

def evaluate_answer(question: str, answer: str, expected_keywords: list[str]) -> dict:
    # Simple keyword presence check
    keyword_score = sum(1 for kw in expected_keywords if kw.lower() in answer.lower())
    keyword_ratio = keyword_score / max(len(expected_keywords), 1)

    # LLM-based evaluation
    messages = [
        {
            "role": "system",
            "content": (
                "You are evaluating a student's oral exam answer. "
                "Score 0-10 based on accuracy, completeness, and understanding. "
                "Reply with ONLY a JSON object: {\"score\": <0-10>, \"feedback\": \"<short feedback>\"}"
            ),
        },
        {
            "role": "user",
            "content": f"Question: {question}\nStudent Answer: {answer}\nExpected keywords: {', '.join(expected_keywords)}",
        },
    ]
    import json
    raw = call_groq(messages, temperature=0.3)
    try:
        result = json.loads(raw)
        return {
            "llm_score": result.get("score", 5),
            "feedback": result.get("feedback", ""),
            "keyword_coverage": round(keyword_ratio, 2),
            "final_score": round((result.get("score", 5) / 10 * 0.7 + keyword_ratio * 0.3) * 10, 1),
        }
    except json.JSONDecodeError:
        return {"llm_score": 5, "feedback": raw, "keyword_coverage": keyword_ratio, "final_score": 5.0}
