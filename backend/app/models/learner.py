from sqlalchemy import Column, String, ForeignKey, JSON, Integer, Text
from sqlalchemy.orm import relationship
from .base import BaseModel

class Learner(BaseModel):
    """Learner model with detailed profile, goals, and preferences"""
    
    __tablename__ = "learners"
    
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, unique=True)
    tenant_id = Column(String(36), nullable=False, index=True)
    
    # Profile information
    profile = Column(JSON, nullable=False, default=dict)
    # {
    #   "title": "Software Engineer",
    #   "department": "Engineering", 
    #   "manager": "Sarah Johnson",
    #   "location": "San Francisco, CA",
    #   "timezone": "America/Los_Angeles",
    #   "bio": "Passionate about data science..."
    # }
    
    # Learning goals
    goals = Column(JSON, nullable=False, default=dict)
    # {
    #   "primary_goal": "Transition to Data Scientist role",
    #   "secondary_goals": ["Master Python", "Learn Statistics"],
    #   "target_roles": ["Data Scientist", "ML Engineer"],
    #   "time_budget_hours": 10,
    #   "preferred_learning_style": "visual"
    # }
    
    # Learning preferences
    preferences = Column(JSON, nullable=False, default=dict)
    # {
    #   "notification_frequency": "daily",
    #   "preferred_content_types": ["video", "interactive"],
    #   "difficulty_preference": "intermediate",
    #   "language": "en"
    # }
    
    # Prior evidence and experience
    prior_evidence = Column(JSON, nullable=False, default=dict)
    # {
    #   "certifications": [...],
    #   "work_experience": [...],
    #   "education": [...]
    # }
    
    # Relationships
    user = relationship("User", back_populates="learner")
    learning_plans = relationship("LearningPlan", back_populates="learner")
    assessments = relationship("Assessment", back_populates="learner")
    assessment_attempts = relationship("AssessmentAttempt", back_populates="learner")
    coach_messages = relationship("CoachMessage", back_populates="learner")
    calendar_events = relationship("CalendarEvent", back_populates="learner")
    
    def __repr__(self):
        return f"<Learner(id={self.id}, user_id={self.user_id})>"
    
    @classmethod
    def get_by_user_id(cls, db_session, user_id: str):
        """Get learner by user ID"""
        return db_session.query(cls).filter(cls.user_id == user_id).first()
    
    @classmethod
    def get_by_tenant(cls, db_session, tenant_id: str, skip: int = 0, limit: int = 100):
        """Get learners by tenant with pagination"""
        return db_session.query(cls).filter(
            cls.tenant_id == tenant_id
        ).offset(skip).limit(limit).all()
    
    def get_current_plan(self):
        """Get the learner's current active learning plan"""
        for plan in self.learning_plans:
            if plan.status == "active":
                return plan
        return None
    
    def get_learning_progress(self):
        """Calculate overall learning progress"""
        total_hours = 0
        completed_hours = 0
        
        for plan in self.learning_plans:
            if plan.status in ["active", "completed"]:
                total_hours += plan.total_hours
                completed_hours += plan.completed_hours
        
        if total_hours == 0:
            return 0
        
        return (completed_hours / total_hours) * 100
