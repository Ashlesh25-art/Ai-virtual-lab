"""Viva Service - Generates and evaluates AI-powered oral examination questions."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from generator import generate_questions
from evaluator import evaluate_answer
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Viva Service", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class GenerateRequest(BaseModel):
    experiment_id: str
    student_id: str
    submission_code: Optional[str] = None
    topic: str

class EvaluateRequest(BaseModel):
    question: str
    answer: str
    expected_keywords: list[str]

@app.get("/health")
def health():
    return {"status": "ok", "service": "viva-service"}

@app.post("/generate")
def generate(req: GenerateRequest):
    return generate_questions(req.topic, req.submission_code)

@app.post("/evaluate")
def evaluate(req: EvaluateRequest):
    return evaluate_answer(req.question, req.answer, req.expected_keywords)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
