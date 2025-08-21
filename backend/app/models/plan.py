from sqlalchemy import Column, String, Text, JSON, Integer, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from .base import BaseModel
import enum
from datetime import datetime

class PlanStatus(enum.Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class StepStatus(enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    SKIPPED = "skipped"

class StepKind(enum.Enum):
    LEARNING = "learning"
    ASSESSMENT = "assessment"
    PROJECT = "project"
    REVIEW = "review"

class LearningPlan(BaseModel):
    """Learning plan model for personalized learning paths"""
    
    __tablename__ = "learning_plans"
    
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    objective = Column(Text, nullable=False)
    status = Column(Enum(PlanStatus), nullable=False, default=PlanStatus.DRAFT)
    
    # Time tracking
    total_hours = Column(Integer, nullable=False, default=0)
    completed_hours = Column(Integer, nullable=False, default=0)
    start_date = Column(DateTime(timezone=True), nullable=False)
    target_date = Column(DateTime(timezone=True), nullable=False)
    
    # Plan metadata
    metadata = Column(JSON, nullable=False, default=dict)
    # {
    #   "created_by": "ai" | "human" | "template",
    #   "template_id": "template-123",
    #   "adaptation_count": 3,
    #   "last_adapted": "2024-01-28T00:00:00Z"
    # }
    
    # Relationships
    learner = relationship("Learner", back_populates="learning_plans")
    plan_steps = relationship("PlanStep", back_populates="plan", order_by="PlanStep.sequence")
    
    def __repr__(self):
        return f"<LearningPlan(id={self.id}, title={self.title}, status={self.status})>"
    
    @classmethod
    def get_by_learner(cls, db_session, learner_id: str, status: PlanStatus = None):
        """Get plans by learner with optional status filter"""
        query = db_session.query(cls).filter(cls.learner_id == learner_id)
        if status:
            query = query.filter(cls.status == status)
        return query.order_by(cls.created_at.desc()).all()
    
    def get_progress_percentage(self):
        """Calculate plan completion percentage"""
        if self.total_hours == 0:
            return 0
        return (self.completed_hours / self.total_hours) * 100
    
    def get_completed_steps(self):
        """Get all completed steps"""
        return [step for step in self.plan_steps if step.status == StepStatus.COMPLETED]
    
    def get_current_step(self):
        """Get the current in-progress step"""
        for step in self.plan_steps:
            if step.status == StepStatus.IN_PROGRESS:
                return step
        return None

class PlanStep(BaseModel):
    """Plan step model for individual learning activities"""
    
    __tablename__ = "plan_steps"
    
    plan_id = Column(String(36), ForeignKey("learning_plans.id"), nullable=False, index=True)
    skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False, index=True)
    content_item_id = Column(String(36), ForeignKey("content_items.id"), nullable=True, index=True)
    
    # Step details
    kind = Column(Enum(StepKind), nullable=False, default=StepKind.LEARNING)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    effort_min = Column(Integer, nullable=False, default=0)
    sequence = Column(Integer, nullable=False)
    status = Column(Enum(StepStatus), nullable=False, default=StepStatus.PENDING)
    
    # Timing
    due_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Progress tracking
    progress_percentage = Column(Integer, nullable=False, default=0)
    
    # Dependencies
    prerequisites = Column(JSON, nullable=False, default=list)  # List of step IDs
    unlocks = Column(JSON, nullable=False, default=list)  # List of step IDs
    
    # Step metadata
    metadata = Column(JSON, nullable=False, default=dict)
    # {
    #   "estimated_difficulty": 3,
    #   "learning_objectives": ["Understand functions", "Practice loops"],
    #   "notes": "Focus on practical examples"
    # }
    
    # Relationships
    plan = relationship("LearningPlan", back_populates="plan_steps")
    skill = relationship("Skill", back_populates="plan_steps")
    content_item = relationship("ContentItem", back_populates="plan_steps")
    
    def __repr__(self):
        return f"<PlanStep(id={self.id}, title={self.title}, status={self.status})>"
    
    @classmethod
    def get_by_plan(cls, db_session, plan_id: str):
        """Get all steps for a plan ordered by sequence"""
        return db_session.query(cls).filter(
            cls.plan_id == plan_id
        ).order_by(cls.sequence).all()
    
    @classmethod
    def get_available_steps(cls, db_session, plan_id: str):
        """Get steps that are available to start (prerequisites met)"""
        # This is a simplified implementation
        # In production, you'd want to check prerequisite completion
        return db_session.query(cls).filter(
            cls.plan_id == plan_id,
            cls.status == StepStatus.PENDING
        ).order_by(cls.sequence).all()
    
    def can_start(self, db_session):
        """Check if step can be started (prerequisites met)"""
        if not self.prerequisites:
            return True
        
        # Check if all prerequisites are completed
        for prereq_id in self.prerequisites:
            prereq = db_session.query(PlanStep).filter(
                PlanStep.id == prereq_id
            ).first()
            if not prereq or prereq.status != StepStatus.COMPLETED:
                return False
        
        return True
    
    def start(self):
        """Mark step as in progress"""
        if self.status == StepStatus.PENDING:
            self.status = StepStatus.IN_PROGRESS
    
    def complete(self):
        """Mark step as completed"""
        if self.status in [StepStatus.PENDING, StepStatus.IN_PROGRESS]:
            self.status = StepStatus.COMPLETED
            self.completed_at = datetime.utcnow()
            self.progress_percentage = 100
