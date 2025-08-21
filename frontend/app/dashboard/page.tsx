'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    Target,
    Calendar,
    TrendingUp,
    MessageSquare,
    CheckCircle,
    Clock,
    Award
} from 'lucide-react';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const mockStats = {
        totalSkills: 24,
        completedSkills: 8,
        currentPlan: 'Data Science Fundamentals',
        nextDeadline: '2024-02-15',
        weeklyProgress: 75,
        totalHours: 120,
        completedHours: 45
    };

    const mockCurrentSteps = [
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

    const mockRecentAchievements = [
        { id: 1, title: 'Completed SQL Fundamentals', date: '2024-01-28', icon: CheckCircle },
        { id: 2, title: 'Passed Data Types Assessment', date: '2024-01-25', icon: Award },
        { id: 3, title: 'Finished 10 hours of learning', date: '2024-01-22', icon: Clock }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600">Welcome back! Here's your learning progress.</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href="/coach"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ask Coach
                            </Link>
                            <Link
                                href="/plan"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Target className="w-4 h-4 mr-2" />
                                View Plan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <BookOpen className="h-8 w-8 text-primary-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Skills Completed</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {mockStats.completedSkills}/{mockStats.totalSkills}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Clock className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Hours Completed</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {mockStats.completedHours}/{mockStats.totalHours}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <TrendingUp className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Weekly Progress</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {mockStats.weeklyProgress}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Calendar className="h-8 w-8 text-orange-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Next Deadline</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {new Date(mockStats.nextDeadline).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Plan Progress */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Current Learning Plan</h2>
                        <p className="text-sm text-gray-600 mt-1">{mockStats.currentPlan}</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {mockCurrentSteps.map((step) => (
                                <div key={step.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-3 h-3 rounded-full ${step.status === 'in-progress' ? 'bg-yellow-400' : 'bg-gray-300'
                                            }`} />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{step.title}</h3>
                                            <p className="text-sm text-gray-500">{step.skill} • {step.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-sm text-gray-500">
                                            {step.progress}% complete
                                        </div>
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${step.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Recent Achievements</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {mockRecentAchievements.map((achievement) => (
                                <div key={achievement.id} className="flex items-center space-x-4">
                                    <achievement.icon className="h-5 w-5 text-green-600" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                                        <p className="text-sm text-gray-500">{achievement.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
