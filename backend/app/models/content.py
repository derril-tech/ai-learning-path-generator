from sqlalchemy import Column, String, Text, JSON, Integer, ForeignKey, Float, Enum, Boolean
from sqlalchemy.orm import relationship
from .base import BaseModel
import enum

class ProviderKind(enum.Enum):
    LMS = "lms"
    VIDEO_PLATFORM = "video_platform"
    DOCUMENTATION = "documentation"
    COURSE_PLATFORM = "course_platform"
    INTERNAL = "internal"

class ContentType(enum.Enum):
    VIDEO = "video"
    READING = "reading"
    INTERACTIVE = "interactive"
    ASSESSMENT = "assessment"
    PROJECT = "project"

class LicenseType(enum.Enum):
    FREE = "free"
    SUBSCRIPTION = "subscription"
    PER_SEAT = "per_seat"
    ENTERPRISE = "enterprise"

class ContentProvider(BaseModel):
    """Content provider model for external learning platforms"""
    
    __tablename__ = "content_providers"
    
    name = Column(String(255), nullable=False)
    kind = Column(Enum(ProviderKind), nullable=False)
    api_key_ref = Column(String(255), nullable=True)  # Reference to secure storage
    license = Column(Enum(LicenseType), nullable=False, default=LicenseType.FREE)
    
    # Cost model configuration
    cost_model = Column(JSON, nullable=False, default=dict)
    # {
    #   "type": "free" | "per_course" | "per_user" | "subscription",
    #   "amount": 29.99,
    #   "currency": "USD"
    # }
    
    # Provider-specific settings
    settings = Column(JSON, nullable=False, default=dict)
    
    # Relationships
    content_items = relationship("ContentItem", back_populates="provider")
    
    def __repr__(self):
        return f"<ContentProvider(id={self.id}, name={self.name}, kind={self.kind})>"

class ContentItem(BaseModel):
    """Content item model for individual learning resources"""
    
    __tablename__ = "content_items"
    
    provider_id = Column(String(36), ForeignKey("content_providers.id"), nullable=False, index=True)
    uri = Column(String(1000), nullable=False)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    type = Column(Enum(ContentType), nullable=False)
    duration_min = Column(Integer, nullable=False, default=0)
    level = Column(String(50), nullable=False, default="beginner")  # beginner, intermediate, advanced
    language = Column(String(10), nullable=False, default="en")
    cost = Column(Float, nullable=False, default=0.0)
    license = Column(Enum(LicenseType), nullable=False, default=LicenseType.FREE)
    tags = Column(JSON, nullable=False, default=list)
    
    # Rich metadata
    metadata = Column(JSON, nullable=False, default=dict)
    # {
    #   "thumbnail_url": "https://...",
    #   "instructor": "Dr. Sarah Chen",
    #   "rating": 4.8,
    #   "review_count": 1247,
    #   "difficulty_score": 2.1,
    #   "completion_rate": 0.89,
    #   "last_updated": "2024-01-10T00:00:00Z"
    # }
    
    # Content availability
    is_active = Column(Boolean, default=True, nullable=False)
    is_featured = Column(Boolean, default=False, nullable=False)
    
    # Relationships
    provider = relationship("ContentProvider", back_populates="content_items")
    plan_steps = relationship("PlanStep", back_populates="content_item")
    
    def __repr__(self):
        return f"<ContentItem(id={self.id}, title={self.title}, type={self.type})>"
    
    @classmethod
    def search_by_query(cls, db_session, query: str, skip: int = 0, limit: int = 100):
        """Search content items by query (simplified)"""
        return db_session.query(cls).filter(
            cls.title.ilike(f"%{query}%"),
            cls.is_active == True
        ).offset(skip).limit(limit).all()
    
    @classmethod
    def get_by_tags(cls, db_session, tags: list, skip: int = 0, limit: int = 100):
        """Get content items by tags"""
        query = db_session.query(cls)
        for tag in tags:
            query = query.filter(cls.tags.contains([tag]))
        return query.filter(cls.is_active == True).offset(skip).limit(limit).all()
    
    @classmethod
    def get_by_type(cls, db_session, content_type: ContentType, skip: int = 0, limit: int = 100):
        """Get content items by type"""
        return db_session.query(cls).filter(
            cls.type == content_type,
            cls.is_active == True
        ).offset(skip).limit(limit).all()
    
    @classmethod
    def get_featured(cls, db_session, skip: int = 0, limit: int = 100):
        """Get featured content items"""
        return db_session.query(cls).filter(
            cls.is_featured == True,
            cls.is_active == True
        ).offset(skip).limit(limit).all()
