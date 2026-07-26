"""
Error Explanation Service - FastAPI microservice
Explains runtime/compilation errors in student-friendly language.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from shared.schemas import ErrorExplanationRequest, ErrorExplanationResponse
from shared.groq_client import call_groq

app = FastAPI(
    title="Error Explanation Service",
    description="Explains code errors in plain language for students",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "error-explanation-service"}

@app.post("/explain", response_model=ErrorExplanationResponse)
def explain_error(req: ErrorExplanationRequest) -> ErrorExplanationResponse:
    messages = [
        {
            "role": "system",
            "content": (
                "You are a friendly programming tutor. Explain the error to the student in simple terms. "
                "Provide: 1) A clear explanation of what went wrong, 2) A specific suggestion to fix it. "
                "Keep each part to 1-2 sentences."
            ),
        },
        {
            "role": "user",
            "content": f"Code:\n```\n{req.code}\n```\n\nError:\n{req.error}",
        },
    ]
    response = call_groq(messages)
    parts = response.split("\n", 1)
    explanation = parts[0].strip()
    suggestion = parts[1].strip() if len(parts) > 1 else "Review the highlighted line and check for syntax errors."
    return ErrorExplanationResponse(explanation=explanation, suggestion=suggestion)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
