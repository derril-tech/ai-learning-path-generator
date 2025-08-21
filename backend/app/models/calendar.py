from sqlalchemy import Column, String, Text, JSON, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from .base import BaseModel
import enum

class CalendarProvider(enum.Enum):
    GOOGLE = "google"
    OUTLOOK = "outlook"
    INTERNAL = "internal"

class EventStatus(enum.Enum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class CalendarEvent(BaseModel):
    """Calendar event model for learning schedule management"""
    
    __tablename__ = "calendar_events"
    
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    plan_step_id = Column(String(36), ForeignKey("plan_steps.id"), nullable=True, index=True)
    provider = Column(Enum(CalendarProvider), nullable=False)
    external_id = Column(String(255), nullable=True)  # ID from external calendar
    
    # Event details
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    start_at = Column(DateTime(timezone=True), nullable=False)
    end_at = Column(DateTime(timezone=True), nullable=False)
    status = Column(Enum(EventStatus), nullable=False, default=EventStatus.SCHEDULED)
    
    # Location and attendees
    location = Column(String(500), nullable=True)
    attendees = Column(JSON, nullable=False, default=list)  # List of email addresses
    
    # Event metadata
    metadata = Column(JSON, nullable=False, default=dict)
    # {
    #   "reminder_minutes": 15,
    #   "recurrence": "weekly",
    #   "color": "#4285f4",
    #   "notes": "Focus on practical examples"
    # }
    
    # Relationships
    learner = relationship("Learner", back_populates="calendar_events")
    
    def __repr__(self):
        return f"<CalendarEvent(id={self.id}, title={self.title}, start_at={self.start_at})>"
    
    @classmethod
    def get_by_learner(cls, db_session, learner_id: str, start_date=None, end_date=None):
        """Get calendar events for a learner within date range"""
        query = db_session.query(cls).filter(cls.learner_id == learner_id)
        
        if start_date:
            query = query.filter(cls.start_at >= start_date)
        if end_date:
            query = query.filter(cls.end_at <= end_date)
        
        return query.order_by(cls.start_at).all()
    
    @classmethod
    def get_by_plan_step(cls, db_session, plan_step_id: str):
        """Get calendar events for a specific plan step"""
        return db_session.query(cls).filter(
            cls.plan_step_id == plan_step_id
        ).order_by(cls.start_at).all()
    
    @classmethod
    def get_upcoming_events(cls, db_session, learner_id: str, limit: int = 10):
        """Get upcoming calendar events for a learner"""
        from datetime import datetime
        now = datetime.utcnow()
        
        return db_session.query(cls).filter(
            cls.learner_id == learner_id,
            cls.start_at >= now,
            cls.status == EventStatus.SCHEDULED
        ).order_by(cls.start_at).limit(limit).all()
    
    def is_overdue(self):
        """Check if event is overdue"""
        from datetime import datetime
        now = datetime.utcnow()
        return self.end_at < now and self.status == EventStatus.SCHEDULED
    
    def get_duration_minutes(self):
        """Get event duration in minutes"""
        duration = self.end_at - self.start_at
        return int(duration.total_seconds() / 60)
