// Core domain types for the Learning Path Generator

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: 'learner' | 'admin' | 'manager';
    tenant_id: string;
    created_at: string;
    updated_at: string;
}

export interface Learner {
    id: string;
    user_id: string;
    tenant_id: string;
    profile: {
        title?: string;
        department?: string;
        manager?: string;
        location?: string;
        timezone?: string;
        bio?: string;
    };
    goals: {
        primary_goal: string;
        secondary_goals: string[];
        target_roles: string[];
        time_budget_hours: number;
        preferred_learning_style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    };
    preferences: {
        notification_frequency: 'daily' | 'weekly' | 'monthly';
        preferred_content_types: ('video' | 'reading' | 'interactive' | 'assessment')[];
        difficulty_preference: 'beginner' | 'intermediate' | 'advanced';
        language: string;
    };
    prior_evidence: {
        certifications: Array<{
            name: string;
            issuer: string;
            date_earned: string;
            expires_at?: string;
        }>;
        work_experience: Array<{
            role: string;
            company: string;
            duration_months: number;
            skills_used: string[];
        }>;
        education: Array<{
            degree: string;
            institution: string;
            graduation_year: number;
            field_of_study: string;
        }>;
    };
    created_at: string;
    updated_at: string;
}

export interface Skill {
    id: string;
    slug: string;
    label: string;
    description: string;
    tags: string[];
    domain: string;
    level_range: {
        min: number;
        max: number;
    };
    prerequisites: string[]; // skill IDs
    estimated_hours: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    created_at: string;
    updated_at: string;
}

export interface SkillEdge {
    id: string;
    src_skill_id: string;
    dst_skill_id: string;
    relation: 'prerequisite' | 'related' | 'alternative';
    weight: number;
}

export interface ContentProvider {
    id: string;
    name: string;
    kind: 'lms' | 'video_platform' | 'documentation' | 'course_platform' | 'internal';
    api_key_ref?: string;
    license: 'free' | 'subscription' | 'per_seat' | 'enterprise';
    cost_model: {
        type: 'free' | 'per_course' | 'per_user' | 'subscription';
        amount?: number;
        currency?: string;
    };
    settings: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface ContentItem {
    id: string;
    provider_id: string;
    uri: string;
    title: string;
    description: string;
    type: 'video' | 'reading' | 'interactive' | 'assessment' | 'project';
    duration_min: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    language: string;
    cost: number;
    license: 'free' | 'subscription' | 'per_seat' | 'enterprise';
    tags: string[];
    metadata: {
        thumbnail_url?: string;
        instructor?: string;
        rating?: number;
        review_count?: number;
        difficulty_score?: number;
        completion_rate?: number;
        last_updated?: string;
    };
    created_at: string;
    updated_at: string;
}

export interface LearningPlan {
    id: string;
    learner_id: string;
    title: string;
    objective: string;
    status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
    total_hours: number;
    completed_hours: number;
    start_date: string;
    target_date: string;
    created_at: string;
    updated_at: string;
}

export interface PlanStep {
    id: string;
    plan_id: string;
    skill_id: string;
    content_item_id?: string;
    kind: 'learning' | 'assessment' | 'project' | 'review';
    title: string;
    description: string;
    effort_min: number;
    sequence: number;
    status: 'pending' | 'in_progress' | 'completed' | 'skipped';
    due_at?: string;
    completed_at?: string;
    progress_percentage: number;
    prerequisites: string[]; // step IDs
    unlocks: string[]; // step IDs
    created_at: string;
    updated_at: string;
}

export interface Assessment {
    id: string;
    learner_id: string;
    skill_id: string;
    type: 'diagnostic' | 'formative' | 'summative' | 'project';
    title: string;
    description: string;
    spec: {
        questions: Array<{
            id: string;
            type: 'multiple_choice' | 'true_false' | 'short_answer' | 'code';
            question: string;
            options?: string[];
            correct_answer: string | string[];
            points: number;
        }>;
        time_limit_min?: number;
        passing_score: number;
        max_attempts: number;
    };
    created_at: string;
    updated_at: string;
}

export interface AssessmentAttempt {
    id: string;
    assessment_id: string;
    learner_id: string;
    score: number;
    mastery_prob: number;
    status: 'in_progress' | 'completed' | 'abandoned';
    started_at: string;
    completed_at?: string;
    details: {
        answers: Array<{
            question_id: string;
            answer: string | string[];
            is_correct: boolean;
            points_earned: number;
        }>;
        time_taken_min: number;
        attempt_number: number;
    };
    created_at: string;
    updated_at: string;
}

export interface CoachMessage {
    id: string;
    learner_id: string;
    content: string;
    sender: 'user' | 'assistant';
    type: 'text' | 'suggestion' | 'plan_update' | 'assessment_result';
    metadata?: {
        suggestions?: string[];
        plan_changes?: any[];
        citations?: string[];
        related_content?: string[];
    };
    created_at: string;
}

export interface CalendarEvent {
    id: string;
    learner_id: string;
    plan_step_id?: string;
    provider: 'google' | 'outlook' | 'internal';
    external_id?: string;
    title: string;
    description: string;
    start_at: string;
    end_at: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    location?: string;
    attendees?: string[];
    created_at: string;
    updated_at: string;
}

export interface Citation {
    id: string;
    step_id?: string;
    message_id?: string;
    document_id: string;
    quote: string;
    span_start: number;
    span_end: number;
    url: string;
    confidence: number;
    created_at: string;
}

export interface Analytics {
    learner_progress: {
        total_skills: number;
        completed_skills: number;
        total_hours: number;
        completed_hours: number;
        weekly_progress: number;
        current_streak_days: number;
        average_daily_hours: number;
    };
    skill_mastery: Array<{
        skill_id: string;
        skill_name: string;
        mastery_level: number;
        last_assessed: string;
        next_review: string;
    }>;
    learning_patterns: {
        preferred_time_slots: Array<{
            hour: number;
            frequency: number;
        }>;
        preferred_content_types: Array<{
            type: string;
            percentage: number;
        }>;
        average_session_duration: number;
        completion_rate: number;
    };
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}

export interface ErrorResponse {
    error: {
        code: string;
        message: string;
        details?: any;
    };
}

// Form types
export interface CreatePlanForm {
    title: string;
    objective: string;
    target_skills: string[];
    time_budget_hours: number;
    target_date: string;
    learning_preferences: {
        preferred_content_types: ('video' | 'reading' | 'interactive' | 'assessment')[];
        difficulty_preference: 'beginner' | 'intermediate' | 'advanced';
        preferred_learning_style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    };
}

export interface UpdateLearnerProfileForm {
    profile: {
        title?: string;
        department?: string;
        manager?: string;
        location?: string;
        timezone?: string;
        bio?: string;
    };
    goals: {
        primary_goal: string;
        secondary_goals: string[];
        target_roles: string[];
        time_budget_hours: number;
        preferred_learning_style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    };
    preferences: {
        notification_frequency: 'daily' | 'weekly' | 'monthly';
        preferred_content_types: ('video' | 'reading' | 'interactive' | 'assessment')[];
        difficulty_preference: 'beginner' | 'intermediate' | 'advanced';
        language: string;
    };
}

// Component prop types
export interface DashboardStats {
    totalSkills: number;
    completedSkills: number;
    currentPlan: string;
    nextDeadline: string;
    weeklyProgress: number;
    totalHours: number;
    completedHours: number;
}

export interface PlanStepDisplay {
    id: number;
    title: string;
    skill: string;
    duration: string;
    status: 'in-progress' | 'upcoming' | 'completed';
    progress: number;
}

export interface Achievement {
    id: number;
    title: string;
    date: string;
    icon: any; // Lucide icon component
}
