from sqlalchemy import Column, String, Enum, Boolean
from sqlalchemy.orm import relationship
from .base import BaseModel
import enum

class UserRole(enum.Enum):
    LEARNER = "learner"
    ADMIN = "admin"
    MANAGER = "manager"

class User(BaseModel):
    """User model for authentication and basic profile"""
    
    __tablename__ = "users"
    
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    avatar = Column(String(500), nullable=True)
    role = Column(Enum(UserRole), default=UserRole.LEARNER, nullable=False)
    tenant_id = Column(String(36), nullable=False, index=True)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    
    # Relationships
    learner = relationship("Learner", back_populates="user", uselist=False)
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"
    
    @classmethod
    def get_by_email(cls, db_session, email: str):
        """Get user by email address"""
        return db_session.query(cls).filter(cls.email == email).first()
    
    @classmethod
    def get_by_tenant(cls, db_session, tenant_id: str, skip: int = 0, limit: int = 100):
        """Get users by tenant with pagination"""
        return db_session.query(cls).filter(
            cls.tenant_id == tenant_id,
            cls.is_active == True
        ).offset(skip).limit(limit).all()
