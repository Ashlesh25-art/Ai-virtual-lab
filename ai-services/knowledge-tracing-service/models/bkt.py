"""
Bayesian Knowledge Tracing (BKT) Model
Tracks student mastery using a simple 4-parameter HMM.
"""

from typing import Dict, Tuple


class BKTModel:
    """Simple BKT with per-concept parameters."""

    DEFAULT_PARAMS = {
        "p_init": 0.1,    # Prior probability of knowing the concept
        "p_transit": 0.2,  # Probability of learning after a trial
        "p_slip": 0.1,     # P(wrong | knows)
        "p_guess": 0.2,    # P(correct | doesn't know)
    }

    def __init__(self):
        # student_id -> concept_id -> mastery_level
        self._mastery: Dict[str, Dict[str, float]] = {}
        # concept_id -> params
        self._params: Dict[str, dict] = {}

    def _get_params(self, concept_id: str) -> dict:
        return self._params.get(concept_id, self.DEFAULT_PARAMS)

    def _get_mastery(self, student_id: str, concept_id: str) -> float:
        return self._mastery.get(student_id, {}).get(concept_id, self.DEFAULT_PARAMS["p_init"])

    def update(self, student_id: str, concept_id: str, is_correct: bool) -> float:
        params = self._get_params(concept_id)
        p_k = self._get_mastery(student_id, concept_id)

        # P(correct | k=0) = p_guess, P(correct | k=1) = 1 - p_slip
        if is_correct:
            p_evidence_given_k = 1 - params["p_slip"]
            p_evidence_given_not_k = params["p_guess"]
        else:
            p_evidence_given_k = params["p_slip"]
            p_evidence_given_not_k = 1 - params["p_guess"]

        # Bayes update
        p_k_given_evidence = (p_evidence_given_k * p_k) / (
            p_evidence_given_k * p_k + p_evidence_given_not_k * (1 - p_k)
        )

        # Apply transition
        p_k_next = p_k_given_evidence + (1 - p_k_given_evidence) * params["p_transit"]

        # Store
        if student_id not in self._mastery:
            self._mastery[student_id] = {}
        self._mastery[student_id][concept_id] = round(p_k_next, 4)

        return p_k_next

    def get_all_mastery(self, student_id: str) -> Dict[str, float]:
        return self._mastery.get(student_id, {})
