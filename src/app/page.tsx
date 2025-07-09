"use client";
import { useState, useEffect } from 'react';
import Header from "./header";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsLoaded(true);
        
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br overflow-hidden">
            {/* Dynamic background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div 
                    className="absolute w-96 h-96 bg-gradient-to-r from-violet-400/20 to-blue-400/20 rounded-full blur-3xl transition-all duration-1000"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                />
                <div 
                    className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl transition-all duration-1000"
                    style={{
                        transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
                    }}
                />
            </div>

            <Header />
            
            {/* Hero Section */}
            <main className="relative pt-24 px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    {/* Main hero content */}
                    <div className="text-center mb-20">
                        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 text-sm font-semibold mb-8">
                                <span className="w-2 h-2 bg-violet-500 rounded-full mr-2 animate-pulse"></span>
                                Welcome to the Future
                            </div>
                            
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-200 mb-8 leading-tight">
                                Build{' '}
                                <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    Amazing
                                </span>
                                <br />
                                Experiences
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                                Create stunning applications with modern design principles and cutting-edge technology
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <button onClick={()=>window.location.href='/todo'} className="group relative bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105 active:scale-95">
                                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    <span className="relative flex items-center">
                                        Get Started
                                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </span>
                                </button>
                                
                                <button className="group px-8 py-4 rounded-2xl text-lg font-semibold text-gray-700 hover:text-violet-600 transition-all duration-300 hover:bg-white/50">
                                    <span className="flex items-center">
                                        Learn More
                                        <span className="ml-2 w-6 h-6 border-2 border-current rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                            <span className="text-xs">▶</span>
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Feature showcase */}
                    <div className={`grid lg:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/90 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500">
                            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white text-2xl">⚡</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
                            <p className="text-gray-600 leading-relaxed">Optimized for performance with modern web technologies and best practices.</p>
                        </div>

                        <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/90 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white text-2xl">🎨</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Beautiful Design</h3>
                            <p className="text-gray-600 leading-relaxed">Crafted with attention to detail and modern design principles.</p>
                        </div>

                        <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/90 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white text-2xl">🚀</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy to Use</h3>
                            <p className="text-gray-600 leading-relaxed">Intuitive interface designed for the best user experience.</p>
                        </div>
                    </div>

                    {/* Stats section */}
                    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 p-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-white mb-4">Trusted by Developers</h2>
                                <p className="text-xl text-blue-100">Join thousands of developers building amazing things</p>
                            </div>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="text-5xl font-black text-white mb-2">10K+</div>
                                    <div className="text-blue-200">Active Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-black text-white mb-2">50K+</div>
                                    <div className="text-blue-200">Projects Created</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-black text-white mb-2">99.9%</div>
                                    <div className="text-blue-200">Uptime</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-black text-white mb-2">24/7</div>
                                    <div className="text-blue-200">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}