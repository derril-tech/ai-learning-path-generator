import Link from 'next/link';
import { ArrowRight, BookOpen, Target, Users, Zap } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-primary-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">Learning Path Generator</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                                About
                            </Link>
                            <Link href="/login" className="btn-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        AI-Driven Learning Paths
                        <span className="text-primary-600 block">That Actually Work</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Personalized, skill-based learning paths for employees and learners.
                        Powered by AI with adaptive plans, verifiable sources, and measurable outcomes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/dashboard" className="btn-primary text-lg px-8 py-3 inline-flex items-center">
                            Start Your Learning Journey
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link href="/about" className="btn-secondary text-lg px-8 py-3">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose Learning Path Generator?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our AI-powered platform creates personalized learning experiences that adapt to your progress and goals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Paths</h3>
                            <p className="text-gray-600">
                                AI creates custom learning paths based on your goals, skills, and time constraints.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-8 w-8 text-success-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Adaptive Learning</h3>
                            <p className="text-gray-600">
                                Plans automatically adjust based on your progress and assessment results.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-8 w-8 text-warning-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Sources</h3>
                            <p className="text-gray-600">
                                All recommendations come with citations and quality-assured content sources.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-secondary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Analytics</h3>
                            <p className="text-gray-600">
                                Track progress, skill coverage, and ROI with comprehensive analytics dashboards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Learning?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Join thousands of learners who have accelerated their career growth with AI-powered learning paths.
                    </p>
                    <Link href="/dashboard" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center">
                        Get Started Today
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <BookOpen className="h-6 w-6 text-primary-400" />
                                <span className="ml-2 text-lg font-semibold">Learning Path Generator</span>
                            </div>
                            <p className="text-gray-400">
                                AI-driven, role-based upskilling with adaptive plans and verifiable sources.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Learning Path Generator. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
