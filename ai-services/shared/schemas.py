from pydantic import BaseModel
from typing import Optional

class HintRequest(BaseModel):
    code: str
    task_description: str
    hint_level: int = 1  # 1=subtle, 2=moderate, 3=direct

class HintResponse(BaseModel):
    hint: str
    hint_level: int

class ErrorExplanationRequest(BaseModel):
    code: str
    error: str

class ErrorExplanationResponse(BaseModel):
    explanation: str
    suggestion: str

class VivaGenerateRequest(BaseModel):
    experiment_id: str
    student_id: str
    submission_code: Optional[str] = None

class VivaQuestion(BaseModel):
    question: str
    expected_keywords: list[str]

class VivaGenerateResponse(BaseModel):
    questions: list[VivaQuestion]

class KnowledgeTracingRequest(BaseModel):
    student_id: str
    concept_id: str
    is_correct: bool

class KnowledgeTracingResponse(BaseModel):
    mastery_level: float
    concept_id: str
