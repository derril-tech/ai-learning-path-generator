'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    ChevronRight,
    Play,
    CheckCircle,
    Clock,
    Target,
    BookOpen,
    Calendar,
    MessageSquare
} from 'lucide-react';

export default function PlanPage() {
    const [selectedStep, setSelectedStep] = useState<number | null>(null);

    const mockPlan = {
        id: 1,
        title: 'Data Science Fundamentals',
        objective: 'Master core data science skills including Python programming, statistics, and data visualization',
        totalHours: 120,
        completedHours: 45,
        startDate: '2024-01-15',
        targetDate: '2024-04-15',
        status: 'in-progress'
    };

    const mockSteps = [
        {
            id: 1,
            title: 'Python Programming Basics',
            description: 'Learn fundamental Python syntax, data structures, and control flow',
            skill: 'Programming',
            duration: 8,
            completedDuration: 5,
            status: 'in-progress',
            content: [
                { id: 1, title: 'Python Variables and Data Types', type: 'video', duration: 45, completed: true },
                { id: 2, title: 'Control Flow and Loops', type: 'interactive', duration: 60, completed: true },
                { id: 3, title: 'Functions and Modules', type: 'reading', duration: 30, completed: false },
                { id: 4, title: 'Python Assessment', type: 'quiz', duration: 20, completed: false }
            ],
            prerequisites: [],
            unlocks: ['Data Manipulation', 'Data Visualization']
        },
        {
            id: 2,
            title: 'Data Manipulation with Pandas',
            description: 'Master data cleaning, transformation, and analysis using pandas',
            skill: 'Data Manipulation',
            duration: 12,
            completedDuration: 0,
            status: 'upcoming',
            content: [
                { id: 5, title: 'Introduction to Pandas', type: 'video', duration: 60, completed: false },
                { id: 6, title: 'Data Cleaning Techniques', type: 'interactive', duration: 90, completed: false },
                { id: 7, title: 'Data Transformation', type: 'reading', duration: 45, completed: false },
                { id: 8, title: 'Pandas Assessment', type: 'quiz', duration: 30, completed: false }
            ],
            prerequisites: ['Python Programming Basics'],
            unlocks: ['Statistical Analysis', 'Machine Learning']
        },
        {
            id: 3,
            title: 'Statistical Analysis Fundamentals',
            description: 'Learn descriptive and inferential statistics for data analysis',
            skill: 'Statistics',
            duration: 10,
            completedDuration: 0,
            status: 'upcoming',
            content: [
                { id: 9, title: 'Descriptive Statistics', type: 'video', duration: 75, completed: false },
                { id: 10, title: 'Probability Distributions', type: 'interactive', duration: 60, completed: false },
                { id: 11, title: 'Hypothesis Testing', type: 'reading', duration: 45, completed: false },
                { id: 12, title: 'Statistics Assessment', type: 'quiz', duration: 25, completed: false }
            ],
            prerequisites: ['Data Manipulation with Pandas'],
            unlocks: ['Machine Learning', 'Data Visualization']
        }
    ];

    const getStepStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'in-progress':
                return <Play className="w-5 h-5 text-blue-600" />;
            case 'upcoming':
                return <Clock className="w-5 h-5 text-gray-400" />;
            default:
                return <Clock className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStepStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'border-green-200 bg-green-50';
            case 'in-progress':
                return 'border-blue-200 bg-blue-50';
            case 'upcoming':
                return 'border-gray-200 bg-gray-50';
            default:
                return 'border-gray-200 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center text-gray-500 hover:text-gray-700"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                Back to Dashboard
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{mockPlan.title}</h1>
                                <p className="text-gray-600">{mockPlan.objective}</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href="/coach"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ask Coach
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plan Overview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center">
                            <Target className="h-8 w-8 text-primary-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Progress</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {Math.round((mockPlan.completedHours / mockPlan.totalHours) * 100)}%
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-8 w-8 text-green-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Hours</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {mockPlan.completedHours}/{mockPlan.totalHours}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-orange-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Target Date</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {new Date(mockPlan.targetDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Steps</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {mockSteps.filter(s => s.status === 'completed').length}/{mockSteps.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Learning Steps */}
                <div className="space-y-6">
                    {mockSteps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`bg-white rounded-lg shadow border-l-4 ${getStepStatusColor(step.status)}`}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            {getStepStatusIcon(step.status)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {step.skill}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{step.description}</p>

                                            {/* Progress Bar */}
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm text-gray-500 mb-1">
                                                    <span>Progress</span>
                                                    <span>{step.completedDuration}/{step.duration} hours</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${(step.completedDuration / step.duration) * 100}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Content Items */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {step.content.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className={`flex items-center space-x-3 p-3 rounded-lg border ${item.completed
                                                                ? 'bg-green-50 border-green-200'
                                                                : 'bg-gray-50 border-gray-200'
                                                            }`}
                                                    >
                                                        <div className={`w-2 h-2 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'
                                                            }`} />
                                                        <div className="flex-1">
                                                            <p className={`text-sm font-medium ${item.completed ? 'text-green-800' : 'text-gray-900'
                                                                }`}>
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {item.type} • {item.duration} min
                                                            </p>
                                                        </div>
                                                        {item.completed && (
                                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Prerequisites and Unlocks */}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {step.prerequisites.length > 0 && (
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-medium text-gray-500">Prerequisites:</span>
                                                        {step.prerequisites.map((prereq, idx) => (
                                                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                                                                {prereq}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {step.unlocks.length > 0 && (
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-medium text-gray-500">Unlocks:</span>
                                                        {step.unlocks.map((unlock, idx) => (
                                                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                                                                {unlock}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 ml-4">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                                            {step.status === 'completed' ? 'Review' : 'Continue'}
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
