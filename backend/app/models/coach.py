from sqlalchemy import Column, String, Text, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .base import BaseModel
import enum

class MessageType(enum.Enum):
    TEXT = "text"
    SUGGESTION = "suggestion"
    PLAN_UPDATE = "plan_update"
    ASSESSMENT_RESULT = "assessment_result"

class CoachMessage(BaseModel):
    """Coach message model for AI coach interactions"""
    
    __tablename__ = "coach_messages"
    
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    sender = Column(String(20), nullable=False)  # 'user' or 'assistant'
    type = Column(Enum(MessageType), nullable=False, default=MessageType.TEXT)
    
    # Message metadata
    metadata = Column(JSON, nullable=False, default=dict)
    # {
    #   "suggestions": ["Continue with next lesson", "Review previous concepts"],
    #   "plan_changes": [...],
    #   "citations": ["Python Documentation", "Data Science Handbook"],
    #   "related_content": ["content-1", "content-2"]
    # }
    
    # Relationships
    learner = relationship("Learner", back_populates="coach_messages")
    
    def __repr__(self):
        return f"<CoachMessage(id={self.id}, sender={self.sender}, type={self.type})>"
    
    @classmethod
    def get_conversation_history(cls, db_session, learner_id: str, limit: int = 50):
        """Get conversation history for a learner"""
        return db_session.query(cls).filter(
            cls.learner_id == learner_id
        ).order_by(cls.created_at.desc()).limit(limit).all()
    
    @classmethod
    def get_messages_by_type(cls, db_session, learner_id: str, message_type: MessageType, limit: int = 20):
        """Get messages by type for a learner"""
        return db_session.query(cls).filter(
            cls.learner_id == learner_id,
            cls.type == message_type
        ).order_by(cls.created_at.desc()).limit(limit).all()
