"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, CheckCircle2, Clock, Tag, User, Edit3, Trash2, Check, RotateCcw } from 'lucide-react';
import Header from "../../header";

export default function TaskPage({ params }: { params: { id: string } }) {
    type Todo = {
        id: number;
        task: string;
        date: string;
        status: string;
    }
    
    const [todo, setTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>('');

    useEffect(() => { 
        setLoading(true); 
        const storedTodos = localStorage.getItem('todos'); 
        if (storedTodos) { 
            const allTodos: Todo[] = JSON.parse(storedTodos); 
            const foundTodo = allTodos.find(todo => todo.id.toString() === params.id); 
            if (foundTodo) { 
                setTodo(foundTodo); 
            } else { 
                console.error(`Todo with ID ${params.id} not found.`); 
            } 
        } else { 
            console.error("No todos found in localStorage."); 
        } 
        setLoading(false); 
    }, [params.id]);

    const getStatusBadge = (status: string) => {
        return status === 'Done' ? 
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle2 className="w-4 h-4" />
                Completed
            </span> : 
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                <Clock className="w-4 h-4" />
                In Progress
            </span>;
    };

    return (
        <>
            <Header />
            <div className="min-h-screen pt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Button */}
                    <button 
                        onClick={() => window.location.href = '/todo'} 
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Todo List
                    </button>

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold  mb-2">Task Details</h1>
                        <p className="text-gray-600">Task ID: #{params.id}</p>
                    </div>

                    {/* Main Content */}
                    {loading ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-3 text-gray-600">Loading task details...</span>
                            </div>
                        </div>
                    ) : !todo ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Tag className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Not Found</h3>
                                <p className="text-gray-600 mb-4">The task with ID #{params.id} could not be found.</p>
                                <button
                                    onClick={() => window.location.href = '/todo'}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Go Back to Todo List
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Task Information Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
                                                {todo.task}
                                            </h2>
                                        </div>
                                    </div>

                                    {!isEditing && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <Calendar className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Created Date</p>
                                                        <p className="text-lg font-semibold text-gray-900">{todo.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                        <Tag className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Status</p>
                                                        <div className="mt-1">
                                                            {getStatusBadge(todo.status)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Task Statistics */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-900">#{todo.id}</div>
                                        <div className="text-sm text-gray-600">Task ID</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-900">{todo.task.length}</div>
                                        <div className="text-sm text-gray-600">Characters</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-900">{todo.task.split(' ').length}</div>
                                        <div className="text-sm text-gray-600">Words</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className={`text-2xl font-bold ${todo.status === 'Done' ? 'text-green-600' : 'text-amber-600'}`}>
                                            {todo.status === 'Done' ? 'YES' : 'NO'}
                                        </div>
                                        <div className="text-sm text-gray-600">Complete</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}