from sqlalchemy import Column, String, Text, JSON, ForeignKey, Integer, Float
from sqlalchemy.orm import relationship
from .base import BaseModel

class Citation(BaseModel):
    """Citation model for tracking content sources and references"""
    
    __tablename__ = "citations"
    
    # References to other entities
    step_id = Column(String(36), ForeignKey("plan_steps.id"), nullable=True, index=True)
    message_id = Column(String(36), ForeignKey("coach_messages.id"), nullable=True, index=True)
    document_id = Column(String(36), nullable=False, index=True)  # Reference to document/chunk
    
    # Citation details
    quote = Column(Text, nullable=False)
    span_start = Column(Integer, nullable=False)
    span_end = Column(Integer, nullable=False)
    url = Column(String(1000), nullable=False)
    confidence = Column(Float, nullable=False, default=1.0)
    
    # Citation metadata
    metadata = Column(JSON, nullable=False, default=dict)
    # {
    #   "source_type": "document" | "video" | "course",
    #   "author": "Dr. Sarah Chen",
    #   "publication_date": "2024-01-15",
    #   "license": "CC BY 4.0",
    #   "tags": ["python", "functions"]
    # }
    
    def __repr__(self):
        return f"<Citation(id={self.id}, document_id={self.document_id}, confidence={self.confidence})>"
    
    @classmethod
    def get_by_step(cls, db_session, step_id: str):
        """Get citations for a specific plan step"""
        return db_session.query(cls).filter(
            cls.step_id == step_id
        ).order_by(cls.confidence.desc()).all()
    
    @classmethod
    def get_by_message(cls, db_session, message_id: str):
        """Get citations for a specific coach message"""
        return db_session.query(cls).filter(
            cls.message_id == message_id
        ).order_by(cls.confidence.desc()).all()
    
    @classmethod
    def get_by_document(cls, db_session, document_id: str):
        """Get citations for a specific document"""
        return db_session.query(cls).filter(
            cls.document_id == document_id
        ).order_by(cls.created_at.desc()).all()
    
    def get_quote_length(self):
        """Get the length of the quoted text"""
        return self.span_end - self.span_start
    
    def is_high_confidence(self):
        """Check if citation has high confidence"""
        return self.confidence >= 0.8
