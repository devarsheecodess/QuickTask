"use client";
import { useState, useEffect } from "react";
import Header from "../header";

export default function AboutPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Simulate loading animation
    setTimeout(() => setIsLoaded(true), 100);
    useEffect(() => {
        setIsLoaded(true);
            
        const handleMouseMove = (e: MouseEvent) => {
           setMousePosition({ x: e.clientX, y: e.clientY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br">
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
            
            {/* Main content with proper spacing for fixed header */}
            <main className="pt-24 px-6 pb-12">
                <div className="max-w-4xl mx-auto">
                    {/* Hero section */}
                    <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 text-sm font-semibold mb-6">
                            <span className="w-2 h-2 bg-violet-500 rounded-full mr-2 animate-pulse"></span>
                            About QuickTask
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-black text-gray-200 mb-6 leading-tight">
                            Built for{' '}
                            <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Effectiveness
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            A simple Next.js task app 🚀
                        </p>
                    </div>

                    {/* Feature cards */}
                    <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/90 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white text-xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Fast & Modern</h3>
                            <p className="text-gray-600 leading-relaxed">Built with Next.js and modern web technologies for optimal performance.</p>
                        </div>

                        <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/90 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white text-xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Simple & Clean</h3>
                            <p className="text-gray-600 leading-relaxed">Focused on simplicity with a clean, intuitive user interface.</p>
                        </div>

                        <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/90 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white text-xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Effective</h3>
                            <p className="text-gray-600 leading-relaxed">Manage your agenda, Never forget a thing</p>
                        </div>
                    </div>

                    {/* Stats section */}
                    <div className={`text-center p-12 bg-gradient-to-r from-violet-600 to-blue-600 rounded-3xl text-white transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-3xl font-bold mb-8">Built With Modern Tech</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-black mb-2">Next.js</div>
                                <div className="text-violet-200">Framework</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black mb-2">React</div>
                                <div className="text-violet-200">Library</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black mb-2">Tailwind</div>
                                <div className="text-violet-200">Styling</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black mb-2">TypeScript</div>
                                <div className="text-violet-200">Language</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}