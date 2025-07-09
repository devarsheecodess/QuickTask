"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg shadow-black/5">
            <div className="max-w-none px-6">
                <nav className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 group">
                        <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                            QuickTask
                        </h1>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-2">
                        <li>
                            <Link
                                href="/"
                                className={`relative group text-gray-200 hover:text-violet-600 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden ${pathname === '/' ? 'text-violet-500' : ''}`}
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                <span className="relative">Home</span>
                                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-4 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={`relative group text-gray-200 hover:text-violet-600 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden ${pathname === '/about' ? 'text-violet-500' : ''}`}
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                <span className="relative">About</span>
                                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-4 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
                            </Link>
                        </li>
                        <li className="ml-4">
                            <button onClick={()=>window.location.href='/todo'} className="relative group cursor-pointer bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 active:scale-95">
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative">Get Started</span>
                            </button>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden relative group cursor-pointer bg-gradient-to-r from-violet-600 to-blue-600 text-white p-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 active:scale-95"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </span>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5">
                        <ul className="flex flex-col p-6 space-y-4">
                            <li>
                                <Link href="/" className="relative group text-gray-200 hover:text-violet-600 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden block">
                                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    <span className="relative">Home</span>
                                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-4 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="relative group text-gray-200 hover:text-violet-600 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden block">
                                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    <span className="relative">About</span>
                                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-4 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={()=>window.location.href='/todo'} className="relative group cursor-pointer bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 active:scale-95 w-full">
                                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    <span className="relative">Get Started</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            
            {/* Subtle animated gradient line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
        </header>
    );
}