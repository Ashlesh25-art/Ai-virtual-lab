"""
Hint Service - FastAPI microservice
Provides progressive AI hints for student code using Groq LLM.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from shared.schemas import HintRequest, HintResponse
from shared.groq_client import call_groq

app = FastAPI(
    title="Hint Service",
    description="AI-powered progressive hint generation for lab experiments",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

HINT_PROMPTS = {
    1: "Give a very subtle hint without revealing the solution. Point the student in the right direction.",
    2: "Give a moderate hint that explains what concept or function they should use.",
    3: "Give a direct hint showing the approach clearly, but not the full solution.",
}

@app.get("/health")
def health():
    return {"status": "ok", "service": "hint-service"}

@app.post("/hint", response_model=HintResponse)
def get_hint(req: HintRequest) -> HintResponse:
    hint_instruction = HINT_PROMPTS.get(req.hint_level, HINT_PROMPTS[1])
    messages = [
        {
            "role": "system",
            "content": (
                f"You are a helpful programming tutor for a virtual lab. "
                f"A student is working on this task:\n{req.task_description}\n\n"
                f"{hint_instruction} Keep the hint to 2-3 sentences."
            ),
        },
        {
            "role": "user",
            "content": f"My current code:\n```\n{req.code}\n```\nPlease give me a hint.",
        },
    ]
    hint_text = call_groq(messages)
    return HintResponse(hint=hint_text, hint_level=req.hint_level)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
