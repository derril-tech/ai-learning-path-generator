# API Specification - Learning Path Generator

## Overview
This document defines the REST API for the Learning Path Generator backend. The API follows RESTful principles and provides comprehensive endpoints for managing learning paths, content, assessments, and AI coach interactions.

## Base Information

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://api.learningpathgenerator.com`

### API Versioning
- **Current Version**: v1
- **Base Path**: `/api/v1`
- **Full Base URL**: `{base_url}/api/v1`

### Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Common Headers
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>  # For authenticated endpoints
```

## Response Formats

### Success Response
```json
{
  "data": <response_data>,
  "message": "Success message",
  "status": "success"
}
```

### Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error details"
    }
  }
}
```

### Paginated Response
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

## Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 422 | Request validation failed |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Endpoints

### Authentication

#### POST /auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "learner"
    }
  },
  "message": "Login successful",
  "status": "success"
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response:**
```json
{
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "token_type": "bearer",
    "expires_in": 3600
  },
  "message": "Token refreshed successfully",
  "status": "success"
}
```

#### POST /auth/logout
Logout user and invalidate tokens.

**Response:**
```json
{
  "data": null,
  "message": "Logout successful",
  "status": "success"
}
```

### Learners

#### GET /learners/me
Get current learner's profile and learning data.

**Response:**
```json
{
  "data": {
    "id": "learner-123",
    "user_id": "user-123",
    "profile": {
      "title": "Software Engineer",
      "department": "Engineering",
      "manager": "Sarah Johnson",
      "location": "San Francisco, CA",
      "timezone": "America/Los_Angeles",
      "bio": "Passionate about data science..."
    },
    "goals": {
      "primary_goal": "Transition to Data Scientist role",
      "secondary_goals": ["Master Python", "Learn Statistics"],
      "target_roles": ["Data Scientist", "ML Engineer"],
      "time_budget_hours": 10,
      "preferred_learning_style": "visual"
    },
    "preferences": {
      "notification_frequency": "daily",
      "preferred_content_types": ["video", "interactive"],
      "difficulty_preference": "intermediate",
      "language": "en"
    },
    "prior_evidence": {
      "certifications": [...],
      "work_experience": [...],
      "education": [...]
    },
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T00:00:00Z"
  },
  "message": "Learner profile retrieved successfully",
  "status": "success"
}
```

#### PUT /learners/me
Update current learner's profile.

**Request Body:**
```json
{
  "profile": {
    "title": "Senior Software Engineer",
    "department": "Engineering",
    "bio": "Updated bio..."
  },
  "goals": {
    "primary_goal": "Become a Machine Learning Engineer",
    "time_budget_hours": 15
  },
  "preferences": {
    "notification_frequency": "weekly",
    "difficulty_preference": "advanced"
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "learner-123",
    "profile": {...},
    "goals": {...},
    "preferences": {...},
    "updated_at": "2024-01-28T00:00:00Z"
  },
  "message": "Learner profile updated successfully",
  "status": "success"
}
```

### Skills

#### GET /skills
Get available skills with filtering and pagination.

**Query Parameters:**
- `domain` (string): Filter by skill domain
- `difficulty` (string): Filter by difficulty level
- `tags` (string): Comma-separated tags to filter by
- `page` (integer): Page number (default: 1)
- `per_page` (integer): Items per page (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "skill-1",
      "slug": "python-programming",
      "label": "Python Programming",
      "description": "Master Python programming fundamentals...",
      "tags": ["programming", "python", "fundamentals"],
      "domain": "Programming",
      "level_range": {"min": 1, "max": 5},
      "prerequisites": [],
      "estimated_hours": 8,
      "difficulty": "beginner",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 50,
    "total_pages": 3
  }
}
```

#### GET /skills/{skill_id}
Get detailed information about a specific skill.

**Response:**
```json
{
  "data": {
    "id": "skill-1",
    "slug": "python-programming",
    "label": "Python Programming",
    "description": "Master Python programming fundamentals...",
    "tags": ["programming", "python", "fundamentals"],
    "domain": "Programming",
    "level_range": {"min": 1, "max": 5},
    "prerequisites": [],
    "estimated_hours": 8,
    "difficulty": "beginner",
    "related_skills": [
      {
        "id": "skill-2",
        "label": "Data Manipulation with Pandas",
        "relation": "prerequisite"
      }
    ],
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Skill retrieved successfully",
  "status": "success"
}
```

### Content

#### GET /content/search
Search for learning content with advanced filtering.

**Query Parameters:**
- `q` (string): Search query
- `type` (string): Content type (video, reading, interactive, assessment)
- `level` (string): Difficulty level (beginner, intermediate, advanced)
- `provider` (string): Content provider
- `tags` (string): Comma-separated tags
- `duration_min` (integer): Minimum duration in minutes
- `duration_max` (integer): Maximum duration in minutes
- `cost_max` (number): Maximum cost
- `page` (integer): Page number (default: 1)
- `per_page` (integer): Items per page (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "content-1",
      "provider_id": "provider-1",
      "uri": "https://example.com/courses/python-basics",
      "title": "Python Programming Basics",
      "description": "Comprehensive introduction to Python...",
      "type": "video",
      "duration_min": 480,
      "level": "beginner",
      "language": "en",
      "cost": 0,
      "license": "free",
      "tags": ["python", "programming", "basics"],
      "metadata": {
        "thumbnail_url": "https://...",
        "instructor": "Dr. Sarah Chen",
        "rating": 4.8,
        "review_count": 1247,
        "difficulty_score": 2.1,
        "completion_rate": 0.89
      },
      "relevance_score": 0.95,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

#### GET /content/{content_id}
Get detailed information about a specific content item.

**Response:**
```json
{
  "data": {
    "id": "content-1",
    "provider": {
      "id": "provider-1",
      "name": "Coursera",
      "kind": "course_platform"
    },
    "uri": "https://example.com/courses/python-basics",
    "title": "Python Programming Basics",
    "description": "Comprehensive introduction to Python...",
    "type": "video",
    "duration_min": 480,
    "level": "beginner",
    "language": "en",
    "cost": 0,
    "license": "free",
    "tags": ["python", "programming", "basics"],
    "metadata": {
      "thumbnail_url": "https://...",
      "instructor": "Dr. Sarah Chen",
      "rating": 4.8,
      "review_count": 1247,
      "difficulty_score": 2.1,
      "completion_rate": 0.89,
      "last_updated": "2024-01-10T00:00:00Z"
    },
    "related_content": [
      {
        "id": "content-2",
        "title": "Python Data Structures",
        "type": "interactive",
        "relevance_score": 0.87
      }
    ],
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Content item retrieved successfully",
  "status": "success"
}
```

### Learning Plans

#### POST /plans
Create a new learning plan.

**Request Body:**
```json
{
  "title": "Data Science Fundamentals",
  "objective": "Master core data science skills including Python programming, statistics, and data visualization",
  "target_skills": ["skill-1", "skill-2", "skill-3"],
  "time_budget_hours": 120,
  "target_date": "2024-04-15T00:00:00Z",
  "learning_preferences": {
    "preferred_content_types": ["video", "interactive", "assessment"],
    "difficulty_preference": "intermediate",
    "preferred_learning_style": "visual"
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "plan-1",
    "learner_id": "learner-123",
    "title": "Data Science Fundamentals",
    "objective": "Master core data science skills...",
    "status": "active",
    "total_hours": 120,
    "completed_hours": 0,
    "start_date": "2024-01-15T00:00:00Z",
    "target_date": "2024-04-15T00:00:00Z",
    "progress_percentage": 0,
    "steps": [
      {
        "id": "step-1",
        "title": "Python Programming Basics",
        "description": "Learn fundamental Python syntax...",
        "skill": {
          "id": "skill-1",
          "label": "Python Programming"
        },
        "content": {
          "id": "content-1",
          "title": "Python Programming Basics"
        },
        "effort_min": 480,
        "sequence": 1,
        "status": "pending",
        "progress_percentage": 0,
        "prerequisites": [],
        "unlocks": ["step-2"]
      }
    ],
    "created_at": "2024-01-15T00:00:00Z"
  },
  "message": "Learning plan created successfully",
  "status": "success"
}
```

#### GET /plans
Get learner's learning plans.

**Query Parameters:**
- `status` (string): Filter by plan status
- `page` (integer): Page number (default: 1)
- `per_page` (integer): Items per page (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "plan-1",
      "title": "Data Science Fundamentals",
      "objective": "Master core data science skills...",
      "status": "active",
      "total_hours": 120,
      "completed_hours": 45,
      "start_date": "2024-01-15T00:00:00Z",
      "target_date": "2024-04-15T00:00:00Z",
      "progress_percentage": 37.5,
      "current_step": {
        "id": "step-1",
        "title": "Python Programming Basics",
        "progress_percentage": 62.5
      },
      "created_at": "2024-01-15T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 3,
    "total_pages": 1
  }
}
```

#### GET /plans/{plan_id}
Get detailed information about a specific learning plan.

**Response:**
```json
{
  "data": {
    "id": "plan-1",
    "learner_id": "learner-123",
    "title": "Data Science Fundamentals",
    "objective": "Master core data science skills...",
    "status": "active",
    "total_hours": 120,
    "completed_hours": 45,
    "start_date": "2024-01-15T00:00:00Z",
    "target_date": "2024-04-15T00:00:00Z",
    "progress_percentage": 37.5,
    "steps": [
      {
        "id": "step-1",
        "title": "Python Programming Basics",
        "description": "Learn fundamental Python syntax...",
        "skill": {
          "id": "skill-1",
          "label": "Python Programming",
          "domain": "Programming"
        },
        "content": {
          "id": "content-1",
          "title": "Python Programming Basics",
          "type": "video",
          "duration_min": 480,
          "uri": "https://example.com/courses/python-basics"
        },
        "effort_min": 480,
        "sequence": 1,
        "status": "in_progress",
        "due_at": "2024-02-01T00:00:00Z",
        "progress_percentage": 62.5,
        "prerequisites": [],
        "unlocks": ["step-2"],
        "metadata": {
          "estimated_difficulty": 2,
          "learning_objectives": ["Understand variables", "Know data types"]
        }
      }
    ],
    "skill_graph": {
      "nodes": [...],
      "edges": [...]
    },
    "created_at": "2024-01-15T00:00:00Z"
  },
  "message": "Learning plan retrieved successfully",
  "status": "success"
}
```

#### PUT /plans/{plan_id}/steps/{step_id}/progress
Update progress for a specific plan step.

**Request Body:**
```json
{
  "progress_percentage": 75,
  "status": "in_progress",
  "notes": "Completed variables and data types sections"
}
```

**Response:**
```json
{
  "data": {
    "id": "step-1",
    "progress_percentage": 75,
    "status": "in_progress",
    "updated_at": "2024-01-28T00:00:00Z"
  },
  "message": "Step progress updated successfully",
  "status": "success"
}
```

### Assessments

#### GET /assessments
Get learner's assessments.

**Query Parameters:**
- `type` (string): Assessment type (diagnostic, formative, summative, project)
- `skill_id` (string): Filter by skill
- `status` (string): Filter by status (pending, in_progress, completed)
- `page` (integer): Page number (default: 1)
- `per_page` (integer): Items per page (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "assessment-1",
      "skill": {
        "id": "skill-1",
        "label": "Python Programming"
      },
      "type": "formative",
      "title": "Python Programming Assessment",
      "description": "Test your understanding of Python fundamentals",
      "status": "pending",
      "total_points": 100,
      "passing_score": 70,
      "time_limit_min": 30,
      "max_attempts": 3,
      "attempts_count": 0,
      "best_score": null,
      "created_at": "2024-01-20T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 5,
    "total_pages": 1
  }
}
```

#### GET /assessments/{assessment_id}
Get detailed information about a specific assessment.

**Response:**
```json
{
  "data": {
    "id": "assessment-1",
    "skill": {
      "id": "skill-1",
      "label": "Python Programming"
    },
    "type": "formative",
    "title": "Python Programming Assessment",
    "description": "Test your understanding of Python fundamentals",
    "total_points": 100,
    "passing_score": 70,
    "time_limit_min": 30,
    "max_attempts": 3,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "What is the correct way to create a function in Python?",
        "options": [
          "function myFunction():",
          "def myFunction():",
          "create myFunction():",
          "func myFunction():"
        ],
        "points": 10
      }
    ],
    "attempts": [
      {
        "id": "attempt-1",
        "score": 85,
        "status": "completed",
        "started_at": "2024-01-25T10:00:00Z",
        "completed_at": "2024-01-25T10:25:00Z"
      }
    ],
    "created_at": "2024-01-20T00:00:00Z"
  },
  "message": "Assessment retrieved successfully",
  "status": "success"
}
```

#### POST /assessments/{assessment_id}/attempts
Start a new assessment attempt.

**Response:**
```json
{
  "data": {
    "id": "attempt-2",
    "assessment_id": "assessment-1",
    "status": "in_progress",
    "started_at": "2024-01-28T14:00:00Z",
    "time_remaining_min": 30,
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "What is the correct way to create a function in Python?",
        "options": [
          "function myFunction():",
          "def myFunction():",
          "create myFunction():",
          "func myFunction():"
        ],
        "points": 10
      }
    ]
  },
  "message": "Assessment attempt started successfully",
  "status": "success"
}
```

#### PUT /assessments/{assessment_id}/attempts/{attempt_id}
Submit assessment attempt answers.

**Request Body:**
```json
{
  "answers": [
    {
      "question_id": "q1",
      "answer": "def myFunction():"
    },
    {
      "question_id": "q2",
      "answer": "true"
    }
  ]
}
```

**Response:**
```json
{
  "data": {
    "id": "attempt-2",
    "score": 85,
    "mastery_prob": 0.7,
    "status": "completed",
    "completed_at": "2024-01-28T14:25:00Z",
    "details": {
      "answers": [
        {
          "question_id": "q1",
          "answer": "def myFunction():",
          "is_correct": true,
          "points_earned": 10
        }
      ],
      "time_taken_min": 25,
      "attempt_number": 2
    }
  },
  "message": "Assessment attempt completed successfully",
  "status": "success"
}
```

### AI Coach

#### POST /coach/chat
Send a message to the AI coach.

**Request Body:**
```json
{
  "message": "I'm stuck on Python functions, can you help me understand them?",
  "context": {
    "current_plan_id": "plan-1",
    "current_step_id": "step-1"
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "message-123",
    "content": "Great question about Python functions! Functions are reusable blocks of code that perform specific tasks. They help you organize your code and avoid repetition. Would you like me to walk you through creating your first function?",
    "sender": "assistant",
    "type": "text",
    "metadata": {
      "suggestions": [
        "Continue with the next lesson",
        "Review previous concepts",
        "Take a practice quiz"
      ],
      "citations": [
        "Python Documentation",
        "Data Science Handbook"
      ],
      "related_content": [
        {
          "id": "content-2",
          "title": "Python Functions Tutorial",
          "type": "video",
          "relevance_score": 0.95
        }
      ]
    },
    "created_at": "2024-01-28T15:00:00Z"
  },
  "message": "Coach response generated successfully",
  "status": "success"
}
```

#### GET /coach/chat
Get conversation history with the AI coach.

**Query Parameters:**
- `limit` (integer): Number of messages to retrieve (default: 50)
- `before` (string): Get messages before this timestamp

**Response:**
```json
{
  "data": [
    {
      "id": "message-123",
      "content": "I'm stuck on Python functions, can you help me understand them?",
      "sender": "user",
      "type": "text",
      "created_at": "2024-01-28T15:00:00Z"
    },
    {
      "id": "message-124",
      "content": "Great question about Python functions! Functions are reusable blocks of code...",
      "sender": "assistant",
      "type": "text",
      "metadata": {
        "suggestions": [...],
        "citations": [...]
      },
      "created_at": "2024-01-28T15:01:00Z"
    }
  ],
  "message": "Conversation history retrieved successfully",
  "status": "success"
}
```

#### GET /coach/chat/stream
Stream real-time coach responses (WebSocket endpoint).

**WebSocket URL**: `ws://localhost:8000/api/v1/coach/chat/stream`

**Message Format:**
```json
{
  "type": "message",
  "content": "User message content",
  "context": {
    "current_plan_id": "plan-1"
  }
}
```

**Stream Response:**
```json
{
  "type": "token",
  "content": "Great question about Python",
  "message_id": "message-124"
}
```

### Calendar

#### GET /calendar/events
Get learner's calendar events.

**Query Parameters:**
- `start_date` (string): Start date (ISO format)
- `end_date` (string): End date (ISO format)
- `provider` (string): Calendar provider (google, outlook, internal)
- `page` (integer): Page number (default: 1)
- `per_page` (integer): Items per page (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "event-1",
      "title": "Python Functions Study Session",
      "description": "Review Python functions and practice examples",
      "start_at": "2024-01-29T10:00:00Z",
      "end_at": "2024-01-29T11:00:00Z",
      "status": "scheduled",
      "location": "Virtual",
      "attendees": ["user@example.com"],
      "plan_step": {
        "id": "step-1",
        "title": "Python Programming Basics"
      },
      "provider": "google",
      "created_at": "2024-01-28T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 15,
    "total_pages": 1
  }
}
```

#### POST /calendar/events
Create a new calendar event.

**Request Body:**
```json
{
  "title": "Python Functions Study Session",
  "description": "Review Python functions and practice examples",
  "start_at": "2024-01-29T10:00:00Z",
  "end_at": "2024-01-29T11:00:00Z",
  "location": "Virtual",
  "attendees": ["user@example.com"],
  "plan_step_id": "step-1",
  "provider": "google"
}
```

**Response:**
```json
{
  "data": {
    "id": "event-1",
    "title": "Python Functions Study Session",
    "description": "Review Python functions and practice examples",
    "start_at": "2024-01-29T10:00:00Z",
    "end_at": "2024-01-29T11:00:00Z",
    "status": "scheduled",
    "location": "Virtual",
    "attendees": ["user@example.com"],
    "plan_step": {
      "id": "step-1",
      "title": "Python Programming Basics"
    },
    "provider": "google",
    "external_id": "google_event_123",
    "created_at": "2024-01-28T00:00:00Z"
  },
  "message": "Calendar event created successfully",
  "status": "success"
}
```

### Analytics

#### GET /analytics/progress
Get learner's learning progress analytics.

**Response:**
```json
{
  "data": {
    "learner_progress": {
      "total_skills": 24,
      "completed_skills": 8,
      "total_hours": 120,
      "completed_hours": 45,
      "weekly_progress": 75,
      "current_streak_days": 5,
      "average_daily_hours": 1.5
    },
    "skill_mastery": [
      {
        "skill_id": "skill-1",
        "skill_name": "Python Programming",
        "mastery_level": 0.75,
        "last_assessed": "2024-01-25T00:00:00Z",
        "next_review": "2024-02-01T00:00:00Z"
      }
    ],
    "learning_patterns": {
      "preferred_time_slots": [
        {"hour": 10, "frequency": 15},
        {"hour": 14, "frequency": 12}
      ],
      "preferred_content_types": [
        {"type": "video", "percentage": 60},
        {"type": "interactive", "percentage": 30},
        {"type": "reading", "percentage": 10}
      ],
      "average_session_duration": 45,
      "completion_rate": 0.85
    },
    "recent_achievements": [
      {
        "id": "achievement-1",
        "title": "Completed SQL Fundamentals",
        "date": "2024-01-28T00:00:00Z",
        "type": "skill_completion"
      }
    ]
  },
  "message": "Analytics retrieved successfully",
  "status": "success"
}
```

#### GET /analytics/team
Get team analytics (admin only).

**Query Parameters:**
- `department` (string): Filter by department
- `date_from` (string): Start date for analytics
- `date_to` (string): End date for analytics

**Response:**
```json
{
  "data": {
    "team_overview": {
      "total_learners": 150,
      "active_learners": 120,
      "total_skills_covered": 45,
      "average_completion_rate": 0.78
    },
    "skill_coverage": [
      {
        "skill_id": "skill-1",
        "skill_name": "Python Programming",
        "learners_count": 45,
        "average_mastery": 0.65,
        "completion_rate": 0.82
      }
    ],
    "department_performance": [
      {
        "department": "Engineering",
        "learners_count": 60,
        "average_progress": 0.75,
        "top_skills": ["Python Programming", "Data Analysis"]
      }
    ],
    "trends": {
      "weekly_enrollment": [...],
      "skill_demand": [...],
      "completion_rates": [...]
    }
  },
  "message": "Team analytics retrieved successfully",
  "status": "success"
}
```

## WebSocket Endpoints

### Real-time Progress Updates
**WebSocket URL**: `ws://localhost:8000/api/v1/progress/stream`

**Authentication**: Include JWT token in connection headers

**Message Types:**
- `progress_update`: Real-time progress updates
- `plan_change`: Learning plan modifications
- `assessment_result`: Assessment completion notifications
- `coach_message`: New coach messages

**Example Message:**
```json
{
  "type": "progress_update",
  "data": {
    "plan_id": "plan-1",
    "step_id": "step-1",
    "progress_percentage": 75,
    "timestamp": "2024-01-28T15:30:00Z"
  }
}
```

## Rate Limiting

### Limits
- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour
- **File uploads**: 10 files per hour
- **Assessment attempts**: 5 attempts per assessment per day

### Headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1643371200
```

## File Uploads

### Supported Formats
- **Images**: JPG, PNG, GIF (max 5MB)
- **Documents**: PDF, DOC, DOCX (max 10MB)
- **Videos**: MP4, WebM (max 100MB)

### Upload Endpoint
**POST /upload**

**Request**: Multipart form data
```
Content-Type: multipart/form-data

file: <file_data>
type: "profile_avatar" | "assessment_submission" | "content_attachment"
```

**Response:**
```json
{
  "data": {
    "file_id": "file-123",
    "filename": "avatar.jpg",
    "url": "https://cdn.example.com/files/avatar.jpg",
    "size": 1024000,
    "mime_type": "image/jpeg"
  },
  "message": "File uploaded successfully",
  "status": "success"
}
```

## Error Handling

### Validation Errors
When request validation fails, the API returns detailed error information:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "email": ["Invalid email format"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

### Business Logic Errors
For business logic errors (e.g., insufficient permissions, resource conflicts):

```json
{
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to access this resource",
    "details": {
      "required_role": "admin",
      "current_role": "learner"
    }
  }
}
```

## Pagination

### Standard Pagination
All list endpoints support pagination with the following parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 20, max: 100)

### Cursor-based Pagination
For large datasets, some endpoints support cursor-based pagination:
- `cursor`: Pagination cursor
- `limit`: Number of items to retrieve

## Filtering and Sorting

### Common Filters
Most endpoints support filtering by:
- Date ranges (`created_at`, `updated_at`)
- Status fields
- Related entity IDs
- Tags and categories

### Sorting
Endpoints support sorting by:
- `sort_by`: Field to sort by
- `sort_order`: `asc` or `desc` (default: `desc`)

Example:
```
GET /content/search?sort_by=created_at&sort_order=desc
```

## Data Models

### Common Fields
All API responses include these common fields:
- `id`: Unique identifier (UUID)
- `created_at`: Creation timestamp (ISO 8601)
- `updated_at`: Last update timestamp (ISO 8601)

### Timestamps
All timestamps are in ISO 8601 format with timezone information:
```
2024-01-28T15:30:00Z
```

### UUIDs
All IDs are UUID v4 strings:
```
550e8400-e29b-41d4-a716-446655440000
```

## Testing

### Test Environment
- **Base URL**: `http://localhost:8000`
- **Database**: Test PostgreSQL instance
- **Authentication**: Test JWT tokens provided in test suite

### Test Data
The API includes test data for development:
- Test users with different roles
- Sample learning plans and content
- Mock assessments and analytics

### API Testing
Use the provided test suite or tools like:
- Postman collections
- Insomnia
- curl commands
- Automated test scripts

## SDKs and Libraries

### JavaScript/TypeScript
```javascript
import { LearningPathAPI } from '@learningpath/api-client';

const api = new LearningPathAPI({
  baseURL: 'https://api.learningpathgenerator.com',
  token: 'your-jwt-token'
});

const plans = await api.plans.list();
```

### Python
```python
from learningpath_api import LearningPathAPI

api = LearningPathAPI(
    base_url="https://api.learningpathgenerator.com",
    token="your-jwt-token"
)

plans = api.plans.list()
```

## Support

### Documentation
- **Interactive API Docs**: Available at `/docs` when running the server
- **OpenAPI Spec**: Available at `/openapi.json`
- **Postman Collection**: Available in the repository

### Contact
- **Technical Support**: tech-support@learningpathgenerator.com
- **API Issues**: api-issues@learningpathgenerator.com
- **Documentation**: docs@learningpathgenerator.com
