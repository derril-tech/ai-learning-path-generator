from sqlalchemy import Column, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from datetime import datetime
import uuid

Base = declarative_base()

class BaseModel(Base):
    """Base model with common fields and functionality"""
    
    __abstract__ = True
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    def to_dict(self):
        """Convert model instance to dictionary"""
        return {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
    
    def update(self, **kwargs):
        """Update model instance with provided fields"""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self.updated_at = datetime.utcnow()
    
    @classmethod
    def get_by_id(cls, db_session, id: str):
        """Get model instance by ID"""
        return db_session.query(cls).filter(cls.id == id).first()
    
    @classmethod
    def get_all(cls, db_session, skip: int = 0, limit: int = 100):
        """Get all model instances with pagination"""
        return db_session.query(cls).offset(skip).limit(limit).all()
