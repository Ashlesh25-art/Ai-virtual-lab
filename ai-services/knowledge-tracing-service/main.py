"""
Knowledge Tracing Service - BKT & DKVMN implementations
Tracks student mastery levels over concepts.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.bkt import BKTModel
from models.dkvmn import DKVMNModel
from pydantic import BaseModel

app = FastAPI(title="Knowledge Tracing Service", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

bkt = BKTModel()
dkvmn = DKVMNModel()

class UpdateRequest(BaseModel):
    student_id: str
    concept_id: str
    is_correct: bool

@app.get("/health")
def health():
    return {"status": "ok", "service": "knowledge-tracing-service"}

@app.post("/update")
def update_mastery(req: UpdateRequest):
    bkt_result = bkt.update(req.student_id, req.concept_id, req.is_correct)
    return {"mastery_level": bkt_result, "concept_id": req.concept_id, "student_id": req.student_id}

@app.get("/mastery/{student_id}")
def get_mastery(student_id: str):
    return bkt.get_all_mastery(student_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)
