'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    Send,
    ChevronLeft,
    Bot,
    User,
    BookOpen,
    Target,
    Lightbulb,
    MessageSquare,
    Sparkles
} from 'lucide-react';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
    type: 'text' | 'suggestion' | 'plan-update';
    metadata?: {
        suggestions?: string[];
        planChanges?: any[];
        citations?: string[];
    };
}

export default function CoachPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hi! I'm your AI learning coach. I'm here to help you with your Data Science Fundamentals plan. How can I assist you today?",
            sender: 'assistant',
            timestamp: new Date(),
            type: 'text'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickSuggestions = [
        "Help me understand the next step in my plan",
        "I'm stuck on Python functions, can you explain?",
        "Show me my progress and what's next",
        "I need help with the statistics assessment",
        "Can you recommend additional resources?"
    ];

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content,
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: generateMockResponse(content),
                sender: 'assistant',
                timestamp: new Date(),
                type: 'text',
                metadata: {
                    suggestions: ['Continue with the next lesson', 'Review previous concepts', 'Take a practice quiz'],
                    citations: ['Python Documentation', 'Data Science Handbook']
                }
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const generateMockResponse = (userInput: string): string => {
        const responses = {
            'help': "I'd be happy to help! Looking at your current plan, you're working on Python Programming Basics. You've completed 5 out of 8 hours. Would you like me to explain the next concept or help you with something specific?",
            'python': "Great question about Python! Functions are reusable blocks of code that perform specific tasks. They help you organize your code and avoid repetition. Would you like me to walk you through creating your first function?",
            'progress': "You're making excellent progress! You've completed 37.5% of your Data Science Fundamentals plan. You're currently working on Python Programming Basics and have 3 more hours to go in this step.",
            'stuck': "Don't worry, it's normal to get stuck! Let me help you break down the concept. What specific part are you having trouble with? I can provide examples, explanations, or suggest alternative learning resources.",
            'default': "I understand you're asking about your learning journey. Let me help you with that. Is there a specific topic or concept you'd like to explore further?"
        };

        const lowerInput = userInput.toLowerCase();
        if (lowerInput.includes('help')) return responses.help;
        if (lowerInput.includes('python')) return responses.python;
        if (lowerInput.includes('progress')) return responses.progress;
        if (lowerInput.includes('stuck')) return responses.stuck;
        return responses.default;
    };

    const handleQuickSuggestion = (suggestion: string) => {
        handleSendMessage(suggestion);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center text-gray-500 hover:text-gray-700"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                Back to Dashboard
                            </Link>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">AI Learning Coach</h1>
                                    <p className="text-sm text-gray-600">Your personalized learning assistant</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Sparkles className="w-4 h-4" />
                            <span>Powered by AI</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-start space-x-2">
                                        {message.sender === 'assistant' && (
                                            <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm">{message.content}</p>

                                            {/* Suggestions */}
                                            {message.metadata?.suggestions && (
                                                <div className="mt-3 space-y-2">
                                                    <p className="text-xs font-medium text-gray-500">Quick actions:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {message.metadata.suggestions.map((suggestion, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => handleQuickSuggestion(suggestion)}
                                                                className="text-xs px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                                            >
                                                                {suggestion}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Citations */}
                                            {message.metadata?.citations && (
                                                <div className="mt-3">
                                                    <p className="text-xs font-medium text-gray-500 mb-1">Sources:</p>
                                                    <div className="space-y-1">
                                                        {message.metadata.citations.map((citation, idx) => (
                                                            <p key={idx} className="text-xs text-gray-600">
                                                                • {citation}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Bot className="w-4 h-4" />
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions */}
                    <div className="border-t border-gray-200 p-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">Quick suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                            {quickSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickSuggestion(suggestion)}
                                    className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                                    placeholder="Ask me anything about your learning plan..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                onClick={() => handleSendMessage(inputValue)}
                                disabled={isLoading || !inputValue.trim()}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                <Send className="w-4 h-4" />
                                <span>Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Learning Context */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <Target className="w-5 h-5 text-primary-600" />
                            <h3 className="font-medium text-gray-900">Current Focus</h3>
                        </div>
                        <p className="text-sm text-gray-600">Python Programming Basics</p>
                        <p className="text-xs text-gray-500 mt-1">5/8 hours completed</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <BookOpen className="w-5 h-5 text-green-600" />
                            <h3 className="font-medium text-gray-900">Next Step</h3>
                        </div>
                        <p className="text-sm text-gray-600">Functions and Modules</p>
                        <p className="text-xs text-gray-500 mt-1">30 min reading</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-yellow-600" />
                            <h3 className="font-medium text-gray-900">Today's Goal</h3>
                        </div>
                        <p className="text-sm text-gray-600">Complete 2 hours of learning</p>
                        <p className="text-xs text-gray-500 mt-1">1.5 hours remaining</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
