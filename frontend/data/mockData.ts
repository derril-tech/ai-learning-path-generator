// Mock data for the Learning Path Generator frontend

import {
    User,
    Learner,
    Skill,
    ContentItem,
    LearningPlan,
    PlanStep,
    Assessment,
    DashboardStats,
    PlanStepDisplay,
    Achievement
} from '../types';
import {
    CheckCircle,
    Award,
    Clock,
    Target,
    BookOpen,
    TrendingUp,
    Star,
    Zap
} from 'lucide-react';

// Mock Users
export const mockUsers: User[] = [
    {
        id: 'user-1',
        email: 'john.doe@company.com',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        role: 'learner',
        tenant_id: 'tenant-1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
    },
    {
        id: 'user-2',
        email: 'jane.smith@company.com',
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'admin',
        tenant_id: 'tenant-1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
    }
];

// Mock Learners
export const mockLearners: Learner[] = [
    {
        id: 'learner-1',
        user_id: 'user-1',
        tenant_id: 'tenant-1',
        profile: {
            title: 'Software Engineer',
            department: 'Engineering',
            manager: 'Sarah Johnson',
            location: 'San Francisco, CA',
            timezone: 'America/Los_Angeles',
            bio: 'Passionate about data science and machine learning. Currently working on improving our data pipeline infrastructure.'
        },
        goals: {
            primary_goal: 'Transition to a Data Scientist role within 6 months',
            secondary_goals: [
                'Master Python for data analysis',
                'Learn statistical modeling techniques',
                'Build a portfolio of data science projects'
            ],
            target_roles: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'],
            time_budget_hours: 10,
            preferred_learning_style: 'visual'
        },
        preferences: {
            notification_frequency: 'daily',
            preferred_content_types: ['video', 'interactive', 'assessment'],
            difficulty_preference: 'intermediate',
            language: 'en'
        },
        prior_evidence: {
            certifications: [
                {
                    name: 'AWS Certified Solutions Architect',
                    issuer: 'Amazon Web Services',
                    date_earned: '2023-06-15',
                    expires_at: '2026-06-15'
                },
                {
                    name: 'Google Cloud Professional Data Engineer',
                    issuer: 'Google',
                    date_earned: '2023-09-20'
                }
            ],
            work_experience: [
                {
                    role: 'Software Engineer',
                    company: 'TechCorp',
                    duration_months: 24,
                    skills_used: ['Python', 'JavaScript', 'React', 'Node.js', 'PostgreSQL']
                },
                {
                    role: 'Junior Developer',
                    company: 'StartupXYZ',
                    duration_months: 18,
                    skills_used: ['Python', 'Django', 'MySQL', 'Git']
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Science in Computer Science',
                    institution: 'University of California, Berkeley',
                    graduation_year: 2020,
                    field_of_study: 'Computer Science'
                }
            ]
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
    }
];

// Mock Skills
export const mockSkills: Skill[] = [
    {
        id: 'skill-1',
        slug: 'python-programming',
        label: 'Python Programming',
        description: 'Master Python programming fundamentals including syntax, data structures, and control flow',
        tags: ['programming', 'python', 'fundamentals'],
        domain: 'Programming',
        level_range: { min: 1, max: 5 },
        prerequisites: [],
        estimated_hours: 8,
        difficulty: 'beginner',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    },
    {
        id: 'skill-2',
        slug: 'data-manipulation-pandas',
        label: 'Data Manipulation with Pandas',
        description: 'Learn to clean, transform, and analyze data using pandas library',
        tags: ['data-science', 'pandas', 'data-manipulation'],
        domain: 'Data Science',
        level_range: { min: 2, max: 4 },
        prerequisites: ['skill-1'],
        estimated_hours: 12,
        difficulty: 'intermediate',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    },
    {
        id: 'skill-3',
        slug: 'statistical-analysis',
        label: 'Statistical Analysis',
        description: 'Learn descriptive and inferential statistics for data analysis',
        tags: ['statistics', 'data-analysis', 'mathematics'],
        domain: 'Statistics',
        level_range: { min: 2, max: 5 },
        prerequisites: ['skill-2'],
        estimated_hours: 10,
        difficulty: 'intermediate',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    },
    {
        id: 'skill-4',
        slug: 'machine-learning-basics',
        label: 'Machine Learning Fundamentals',
        description: 'Introduction to machine learning algorithms and techniques',
        tags: ['machine-learning', 'ai', 'algorithms'],
        domain: 'Machine Learning',
        level_range: { min: 3, max: 5 },
        prerequisites: ['skill-2', 'skill-3'],
        estimated_hours: 15,
        difficulty: 'advanced',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    },
    {
        id: 'skill-5',
        slug: 'data-visualization',
        label: 'Data Visualization',
        description: 'Create compelling visualizations using matplotlib, seaborn, and plotly',
        tags: ['data-visualization', 'matplotlib', 'seaborn'],
        domain: 'Data Science',
        level_range: { min: 2, max: 4 },
        prerequisites: ['skill-1'],
        estimated_hours: 8,
        difficulty: 'intermediate',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    }
];

// Mock Content Items
export const mockContentItems: ContentItem[] = [
    {
        id: 'content-1',
        provider_id: 'provider-1',
        uri: 'https://example.com/courses/python-basics',
        title: 'Python Programming Basics',
        description: 'Comprehensive introduction to Python programming language',
        type: 'video',
        duration_min: 480,
        level: 'beginner',
        language: 'en',
        cost: 0,
        license: 'free',
        tags: ['python', 'programming', 'basics'],
        metadata: {
            thumbnail_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
            instructor: 'Dr. Sarah Chen',
            rating: 4.8,
            review_count: 1247,
            difficulty_score: 2.1,
            completion_rate: 0.89,
            last_updated: '2024-01-10T00:00:00Z'
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-10T00:00:00Z'
    },
    {
        id: 'content-2',
        provider_id: 'provider-2',
        uri: 'https://example.com/courses/pandas-data-manipulation',
        title: 'Data Manipulation with Pandas',
        description: 'Master data cleaning and transformation using pandas',
        type: 'interactive',
        duration_min: 720,
        level: 'intermediate',
        language: 'en',
        cost: 29.99,
        license: 'subscription',
        tags: ['pandas', 'data-manipulation', 'python'],
        metadata: {
            thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
            instructor: 'Prof. Michael Rodriguez',
            rating: 4.9,
            review_count: 892,
            difficulty_score: 3.2,
            completion_rate: 0.76,
            last_updated: '2024-01-05T00:00:00Z'
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-05T00:00:00Z'
    },
    {
        id: 'content-3',
        provider_id: 'provider-3',
        uri: 'https://example.com/courses/statistical-analysis',
        title: 'Statistical Analysis Fundamentals',
        description: 'Learn descriptive and inferential statistics',
        type: 'reading',
        duration_min: 600,
        level: 'intermediate',
        language: 'en',
        cost: 0,
        license: 'free',
        tags: ['statistics', 'data-analysis', 'mathematics'],
        metadata: {
            thumbnail_url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=225&fit=crop',
            instructor: 'Dr. Emily Watson',
            rating: 4.7,
            review_count: 567,
            difficulty_score: 3.5,
            completion_rate: 0.68,
            last_updated: '2024-01-08T00:00:00Z'
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-08T00:00:00Z'
    }
];

// Mock Learning Plans
export const mockLearningPlans: LearningPlan[] = [
    {
        id: 'plan-1',
        learner_id: 'learner-1',
        title: 'Data Science Fundamentals',
        objective: 'Master core data science skills including Python programming, statistics, and data visualization',
        status: 'active',
        total_hours: 120,
        completed_hours: 45,
        start_date: '2024-01-15T00:00:00Z',
        target_date: '2024-04-15T00:00:00Z',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-28T00:00:00Z'
    }
];

// Mock Plan Steps
export const mockPlanSteps: PlanStep[] = [
    {
        id: 'step-1',
        plan_id: 'plan-1',
        skill_id: 'skill-1',
        content_item_id: 'content-1',
        kind: 'learning',
        title: 'Python Programming Basics',
        description: 'Learn fundamental Python syntax, data structures, and control flow',
        effort_min: 480,
        sequence: 1,
        status: 'in_progress',
        due_at: '2024-02-01T00:00:00Z',
        progress_percentage: 62.5,
        prerequisites: [],
        unlocks: ['step-2', 'step-5'],
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-28T00:00:00Z'
    },
    {
        id: 'step-2',
        plan_id: 'plan-1',
        skill_id: 'skill-2',
        content_item_id: 'content-2',
        kind: 'learning',
        title: 'Data Manipulation with Pandas',
        description: 'Master data cleaning, transformation, and analysis using pandas',
        effort_min: 720,
        sequence: 2,
        status: 'pending',
        due_at: '2024-02-15T00:00:00Z',
        progress_percentage: 0,
        prerequisites: ['step-1'],
        unlocks: ['step-3'],
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
    },
    {
        id: 'step-3',
        plan_id: 'plan-1',
        skill_id: 'skill-3',
        content_item_id: 'content-3',
        kind: 'learning',
        title: 'Statistical Analysis Fundamentals',
        description: 'Learn descriptive and inferential statistics for data analysis',
        effort_min: 600,
        sequence: 3,
        status: 'pending',
        due_at: '2024-03-01T00:00:00Z',
        progress_percentage: 0,
        prerequisites: ['step-2'],
        unlocks: ['step-4'],
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
    }
];

// Mock Assessments
export const mockAssessments: Assessment[] = [
    {
        id: 'assessment-1',
        learner_id: 'learner-1',
        skill_id: 'skill-1',
        type: 'formative',
        title: 'Python Programming Assessment',
        description: 'Test your understanding of Python fundamentals',
        spec: {
            questions: [
                {
                    id: 'q1',
                    type: 'multiple_choice',
                    question: 'What is the correct way to create a function in Python?',
                    options: [
                        'function myFunction():',
                        'def myFunction():',
                        'create myFunction():',
                        'func myFunction():'
                    ],
                    correct_answer: 'def myFunction():',
                    points: 10
                },
                {
                    id: 'q2',
                    type: 'true_false',
                    question: 'Python is a dynamically typed language.',
                    correct_answer: 'true',
                    points: 5
                }
            ],
            time_limit_min: 30,
            passing_score: 70,
            max_attempts: 3
        },
        created_at: '2024-01-20T00:00:00Z',
        updated_at: '2024-01-20T00:00:00Z'
    }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
    totalSkills: 24,
    completedSkills: 8,
    currentPlan: 'Data Science Fundamentals',
    nextDeadline: '2024-02-15',
    weeklyProgress: 75,
    totalHours: 120,
    completedHours: 45
};

// Mock Plan Step Display Data
export const mockPlanStepDisplays: PlanStepDisplay[] = [
    {
        id: 1,
        title: 'Python Basics',
        skill: 'Programming',
        duration: '2 hours',
        status: 'in-progress',
        progress: 60
    },
    {
        id: 2,
        title: 'Data Visualization with Matplotlib',
        skill: 'Data Visualization',
        duration: '3 hours',
        status: 'upcoming',
        progress: 0
    },
    {
        id: 3,
        title: 'Statistical Analysis Fundamentals',
        skill: 'Statistics',
        duration: '4 hours',
        status: 'upcoming',
        progress: 0
    }
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
    {
        id: 1,
        title: 'Completed SQL Fundamentals',
        date: '2024-01-28',
        icon: CheckCircle
    },
    {
        id: 2,
        title: 'Passed Data Types Assessment',
        date: '2024-01-25',
        icon: Award
    },
    {
        id: 3,
        title: 'Finished 10 hours of learning',
        date: '2024-01-22',
        icon: Clock
    },
    {
        id: 4,
        title: 'Achieved 5-day learning streak',
        date: '2024-01-20',
        icon: Zap
    },
    {
        id: 5,
        title: 'Completed first project',
        date: '2024-01-18',
        icon: Star
    }
];

// Mock Learning Path Templates
export const mockLearningPathTemplates = [
    {
        id: 'template-1',
        title: 'Data Analyst Career Path',
        description: 'Complete path to become a data analyst',
        duration: '6 months',
        totalHours: 200,
        skills: ['Excel', 'SQL', 'Python', 'Tableau', 'Statistics'],
        difficulty: 'beginner',
        targetRole: 'Data Analyst'
    },
    {
        id: 'template-2',
        title: 'Machine Learning Engineer',
        description: 'Advanced path for ML engineering',
        duration: '12 months',
        totalHours: 400,
        skills: ['Python', 'Statistics', 'ML Algorithms', 'Deep Learning', 'MLOps'],
        difficulty: 'advanced',
        targetRole: 'Machine Learning Engineer'
    },
    {
        id: 'template-3',
        title: 'Full Stack Developer',
        description: 'Modern full stack development skills',
        duration: '8 months',
        totalHours: 300,
        skills: ['JavaScript', 'React', 'Node.js', 'Databases', 'DevOps'],
        difficulty: 'intermediate',
        targetRole: 'Full Stack Developer'
    }
];

// Mock Content Search Results
export const mockContentSearchResults = {
    query: 'python data analysis',
    results: [
        {
            id: 'search-1',
            title: 'Python for Data Analysis',
            type: 'course',
            provider: 'Coursera',
            duration: '6 weeks',
            rating: 4.8,
            price: 49.99,
            relevance_score: 0.95,
            tags: ['python', 'data-analysis', 'pandas']
        },
        {
            id: 'search-2',
            title: 'Data Analysis with Python',
            type: 'video',
            provider: 'YouTube',
            duration: '2 hours',
            rating: 4.6,
            price: 0,
            relevance_score: 0.87,
            tags: ['python', 'data-analysis', 'numpy']
        }
    ],
    filters: {
        content_types: ['video', 'course', 'book', 'interactive'],
        difficulty_levels: ['beginner', 'intermediate', 'advanced'],
        providers: ['Coursera', 'edX', 'YouTube', 'LinkedIn Learning'],
        price_ranges: ['free', 'paid', 'subscription']
    }
};

// Mock Skill Graph Data
export const mockSkillGraphData = {
    nodes: [
        { id: 'python', label: 'Python', level: 1, completed: true },
        { id: 'pandas', label: 'Pandas', level: 2, completed: false },
        { id: 'numpy', label: 'NumPy', level: 2, completed: false },
        { id: 'matplotlib', label: 'Matplotlib', level: 2, completed: false },
        { id: 'statistics', label: 'Statistics', level: 3, completed: false },
        { id: 'ml', label: 'Machine Learning', level: 4, completed: false }
    ],
    edges: [
        { source: 'python', target: 'pandas', type: 'prerequisite' },
        { source: 'python', target: 'numpy', type: 'prerequisite' },
        { source: 'python', target: 'matplotlib', type: 'prerequisite' },
        { source: 'pandas', target: 'statistics', type: 'prerequisite' },
        { source: 'numpy', target: 'statistics', type: 'prerequisite' },
        { source: 'statistics', target: 'ml', type: 'prerequisite' }
    ]
};
