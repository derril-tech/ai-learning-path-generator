from sqlalchemy import Column, String, Text, JSON, Integer, ForeignKey, Float, Enum
from sqlalchemy.orm import relationship
from .base import BaseModel
import enum

class SkillDifficulty(enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class SkillRelation(enum.Enum):
    PREREQUISITE = "prerequisite"
    RELATED = "related"
    ALTERNATIVE = "alternative"

class Skill(BaseModel):
    """Skill model representing learning objectives and competencies"""
    
    __tablename__ = "skills"
    
    slug = Column(String(255), unique=True, nullable=False, index=True)
    label = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    tags = Column(JSON, nullable=False, default=list)  # List of tag strings
    domain = Column(String(255), nullable=False, index=True)
    
    # Level range for skill progression
    level_range = Column(JSON, nullable=False, default=dict)
    # {
    #   "min": 1,
    #   "max": 5
    # }
    
    # Prerequisites (skill IDs)
    prerequisites = Column(JSON, nullable=False, default=list)
    
    # Estimated learning time
    estimated_hours = Column(Integer, nullable=False, default=0)
    
    # Difficulty level
    difficulty = Column(Enum(SkillDifficulty), nullable=False, default=SkillDifficulty.BEGINNER)
    
    # Relationships
    incoming_edges = relationship("SkillEdge", foreign_keys="SkillEdge.dst_skill_id", back_populates="dst_skill")
    outgoing_edges = relationship("SkillEdge", foreign_keys="SkillEdge.src_skill_id", back_populates="src_skill")
    plan_steps = relationship("PlanStep", back_populates="skill")
    assessments = relationship("Assessment", back_populates="skill")
    
    def __repr__(self):
        return f"<Skill(id={self.id}, slug={self.slug}, label={self.label})>"
    
    @classmethod
    def get_by_slug(cls, db_session, slug: str):
        """Get skill by slug"""
        return db_session.query(cls).filter(cls.slug == slug).first()
    
    @classmethod
    def get_by_domain(cls, db_session, domain: str, skip: int = 0, limit: int = 100):
        """Get skills by domain with pagination"""
        return db_session.query(cls).filter(
            cls.domain == domain
        ).offset(skip).limit(limit).all()
    
    @classmethod
    def search_by_tags(cls, db_session, tags: list, skip: int = 0, limit: int = 100):
        """Search skills by tags"""
        # This is a simplified search - in production, you might want to use full-text search
        query = db_session.query(cls)
        for tag in tags:
            query = query.filter(cls.tags.contains([tag]))
        return query.offset(skip).limit(limit).all()
    
    def get_prerequisite_skills(self, db_session):
        """Get all prerequisite skills"""
        if not self.prerequisites:
            return []
        
        return db_session.query(Skill).filter(
            Skill.id.in_(self.prerequisites)
        ).all()
    
    def get_related_skills(self, db_session):
        """Get skills related through edges"""
        return db_session.query(Skill).join(SkillEdge).filter(
            (SkillEdge.src_skill_id == self.id) | (SkillEdge.dst_skill_id == self.id)
        ).all()

class SkillEdge(BaseModel):
    """Skill edge model for representing relationships between skills"""
    
    __tablename__ = "skill_edges"
    
    src_skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False, index=True)
    dst_skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False, index=True)
    relation = Column(Enum(SkillRelation), nullable=False, default=SkillRelation.PREREQUISITE)
    weight = Column(Float, nullable=False, default=1.0)
    
    # Relationships
    src_skill = relationship("Skill", foreign_keys=[src_skill_id], back_populates="outgoing_edges")
    dst_skill = relationship("Skill", foreign_keys=[dst_skill_id], back_populates="incoming_edges")
    
    def __repr__(self):
        return f"<SkillEdge(src={self.src_skill_id}, dst={self.dst_skill_id}, relation={self.relation})>"
    
    @classmethod
    def get_prerequisites_for_skill(cls, db_session, skill_id: str):
        """Get all prerequisite edges for a skill"""
        return db_session.query(cls).filter(
            cls.dst_skill_id == skill_id,
            cls.relation == SkillRelation.PREREQUISITE
        ).all()
    
    @classmethod
    def get_related_skills_for_skill(cls, db_session, skill_id: str):
        """Get all related skills for a skill"""
        return db_session.query(cls).filter(
            (cls.src_skill_id == skill_id) | (cls.dst_skill_id == skill_id),
            cls.relation == SkillRelation.RELATED
        ).all()
