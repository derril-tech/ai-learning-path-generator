from sqlalchemy import Column, String, Text, JSON, Integer, ForeignKey, Float, Enum, DateTime
from sqlalchemy.orm import relationship
from .base import BaseModel
import enum
from datetime import datetime

class AssessmentType(enum.Enum):
    DIAGNOSTIC = "diagnostic"
    FORMATIVE = "formative"
    SUMMATIVE = "summative"
    PROJECT = "project"

class QuestionType(enum.Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    TRUE_FALSE = "true_false"
    SHORT_ANSWER = "short_answer"
    CODE = "code"

class AttemptStatus(enum.Enum):
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ABANDONED = "abandoned"

class Assessment(BaseModel):
    """Assessment model for learning evaluations"""
    
    __tablename__ = "assessments"
    
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False, index=True)
    type = Column(Enum(AssessmentType), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    # Assessment specification
    spec = Column(JSON, nullable=False, default=dict)
    # {
    #   "questions": [
    #     {
    #       "id": "q1",
    #       "type": "multiple_choice",
    #       "question": "What is Python?",
    #       "options": ["Programming language", "Snake", "Game"],
    #       "correct_answer": "Programming language",
    #       "points": 10
    #     }
    #   ],
    #   "time_limit_min": 30,
    #   "passing_score": 70,
    #   "max_attempts": 3
    # }
    
    # Assessment metadata
    metadata = Column(JSON, nullable=False, default=dict)
    # {
    #   "estimated_difficulty": 3,
    #   "tags": ["python", "basics"],
    #   "learning_objectives": ["Understand variables", "Know data types"]
    # }
    
    # Relationships
    learner = relationship("Learner", back_populates="assessments")
    skill = relationship("Skill", back_populates="assessments")
    attempts = relationship("AssessmentAttempt", back_populates="assessment")
    
    def __repr__(self):
        return f"<Assessment(id={self.id}, title={self.title}, type={self.type})>"
    
    @classmethod
    def get_by_learner(cls, db_session, learner_id: str, assessment_type: AssessmentType = None):
        """Get assessments by learner with optional type filter"""
        query = db_session.query(cls).filter(cls.learner_id == learner_id)
        if assessment_type:
            query = query.filter(cls.type == assessment_type)
        return query.order_by(cls.created_at.desc()).all()
    
    @classmethod
    def get_by_skill(cls, db_session, skill_id: str):
        """Get assessments by skill"""
        return db_session.query(cls).filter(
            cls.skill_id == skill_id
        ).order_by(cls.created_at.desc()).all()
    
    def get_total_points(self):
        """Calculate total possible points"""
        total = 0
        for question in self.spec.get('questions', []):
            total += question.get('points', 0)
        return total
    
    def get_passing_score(self):
        """Get passing score threshold"""
        return self.spec.get('passing_score', 70)
    
    def get_time_limit(self):
        """Get time limit in minutes"""
        return self.spec.get('time_limit_min', None)
    
    def get_max_attempts(self):
        """Get maximum allowed attempts"""
        return self.spec.get('max_attempts', 1)

class AssessmentAttempt(BaseModel):
    """Assessment attempt model for tracking individual attempts"""
    
    __tablename__ = "assessment_attempts"
    
    assessment_id = Column(String(36), ForeignKey("assessments.id"), nullable=False, index=True)
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    
    # Results
    score = Column(Float, nullable=False, default=0.0)
    mastery_prob = Column(Float, nullable=False, default=0.0)  # Bayesian Knowledge Tracing
    status = Column(Enum(AttemptStatus), nullable=False, default=AttemptStatus.IN_PROGRESS)
    
    # Timing
    started_at = Column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Detailed results
    details = Column(JSON, nullable=False, default=dict)
    # {
    #   "answers": [
    #     {
    #       "question_id": "q1",
    #       "answer": "Programming language",
    #       "is_correct": true,
    #       "points_earned": 10
    #     }
    #   ],
    #   "time_taken_min": 25,
    #   "attempt_number": 1
    # }
    
    # Relationships
    assessment = relationship("Assessment", back_populates="attempts")
    learner = relationship("Learner", back_populates="assessment_attempts")
    
    def __repr__(self):
        return f"<AssessmentAttempt(id={self.id}, assessment_id={self.assessment_id}, score={self.score})>"
    
    @classmethod
    def get_by_assessment(cls, db_session, assessment_id: str):
        """Get all attempts for an assessment"""
        return db_session.query(cls).filter(
            cls.assessment_id == assessment_id
        ).order_by(cls.created_at.desc()).all()
    
    @classmethod
    def get_by_learner(cls, db_session, learner_id: str):
        """Get all attempts by a learner"""
        return db_session.query(cls).filter(
            cls.learner_id == learner_id
        ).order_by(cls.created_at.desc()).all()
    
    @classmethod
    def get_latest_attempt(cls, db_session, assessment_id: str, learner_id: str):
        """Get the latest attempt for a specific assessment by a learner"""
        return db_session.query(cls).filter(
            cls.assessment_id == assessment_id,
            cls.learner_id == learner_id
        ).order_by(cls.created_at.desc()).first()
    
    def calculate_score(self):
        """Calculate score based on answers"""
        total_points = 0
        earned_points = 0
        
        for answer in self.details.get('answers', []):
            if answer.get('is_correct', False):
                earned_points += answer.get('points_earned', 0)
            total_points += answer.get('points_earned', 0)
        
        if total_points == 0:
            return 0
        
        return (earned_points / total_points) * 100
    
    def is_passing(self):
        """Check if attempt is passing"""
        passing_score = self.assessment.get_passing_score()
        return self.score >= passing_score
    
    def complete(self, answers: list, time_taken_min: int):
        """Complete the assessment attempt"""
        self.details['answers'] = answers
        self.details['time_taken_min'] = time_taken_min
        self.details['attempt_number'] = len(self.assessment.attempts) + 1
        
        self.score = self.calculate_score()
        self.status = AttemptStatus.COMPLETED
        self.completed_at = datetime.utcnow()
        
        # Calculate mastery probability (simplified)
        # In production, you'd use Bayesian Knowledge Tracing
        if self.score >= 90:
            self.mastery_prob = 0.9
        elif self.score >= 80:
            self.mastery_prob = 0.7
        elif self.score >= 70:
            self.mastery_prob = 0.5
        else:
            self.mastery_prob = 0.2
