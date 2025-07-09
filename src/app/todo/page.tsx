"use client";
import {useState, useEffect} from 'react';
import { Plus, Edit3, Trash2, Eye, Check, RotateCcw, Calendar, CheckCircle2, Clock } from 'lucide-react';
import Header from "../header";

export default function TodoPage() {
    type Todo = {
        id: number;
        task: string;
        date: string;
        status: string;
    };
    
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editId, setEditId] = useState<number | null>(null);
    const [form, setForm] = useState({task: '', status: 'Pending' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.task.trim()) return;
        
        try {
            const newTask = {
                id:  todos[todos.length - 1]?.id + 1 || 1,
                task: form.task,
                date: new Date().toLocaleDateString(),
                status: form.status,
            };
            const updatedTodos = [...todos, newTask];
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            setForm({ task: '', status: 'Pending' });
            console.log("Task added successfully:", newTask);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const loadTodos = () => {
        setLoading(true);
        const storedTodos = localStorage.getItem('todos');
        const defaultTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
        setTodos(defaultTodos);
        setLoading(false);
    };

    const startEditTask = (id: number) => {
        const taskToEdit = todos.find(todo => todo.id === id);
        if (taskToEdit) {
            setForm({ task: taskToEdit.task, status: taskToEdit.status });
            setEditId(id);
        }
    };

    const saveEditedTask = () => {
        if (editId === null || !form.task.trim()) return;

        const updated = todos.map(todo =>
            todo.id === editId
            ? {
                ...todo,
                task: form.task,
                status: form.status,
                date: new Date().toLocaleDateString(),
            }
            : todo
        );

        setTodos(updated);
        localStorage.setItem('todos', JSON.stringify(updated));
        setEditId(null);
        setForm({ task: '', status: 'Pending' });
        console.log('Task updated successfully');
    };

    const deleteTask = (id: number) => {
        const cf = confirm("Are you sure you want to delete this task?");
        if (!cf) return;
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        console.log(`Task with id ${id} deleted successfully`);
    };

    const setDone = (id: number) => {
        const updatedTodos = todos.map(todo => 
            todo.id === id ? { ...todo, status: 'Done' } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        console.log(`Task with id ${id} marked as done`);
    };

    const setUndo = (id: number) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, status: 'Pending' } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        console.log(`Task with id ${id} marked as pending`);
    };

    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    const getStatusIcon = (status: string) => {
        return status === 'Done' ? 
            <CheckCircle2 className="w-4 h-4 text-green-600" /> : 
            <Clock className="w-4 h-4 text-amber-600" />;
    };

    const getStatusBadge = (status: string) => {
        return status === 'Done' ? 
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle2 className="w-3 h-3" />
                Done
            </span> : 
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                <Clock className="w-3 h-3" />
                Pending
            </span>;
    };

    return (
        <>
            <Header />
            <div className="min-h-screen pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Add Task Form */}
                    <div className="rounded-xl shadow-sm mb-8">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-200 mb-4">
                                {editId !== null ? 'Edit Task' : 'Add New Task'}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <input
                                        name="task"
                                        value={form.task}
                                        onChange={handleInputChange}
                                        placeholder="Enter task description..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (editId !== null) {
                                                    saveEditedTask();
                                                } else {
                                                    addTask(e as any);
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button 
                                        onClick={editId !== null ? saveEditedTask : (e) => addTask(e as any)}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        {editId !== null ? (
                                            <>
                                                <Edit3 className="w-4 h-4" />
                                                Update Task
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-4 h-4" />
                                                Add Task
                                            </>
                                        )}
                                    </button>
                                    {editId !== null && (
                                        <button
                                            onClick={() => {
                                                setEditId(null);
                                                setForm({ task: '', status: 'Pending' });
                                            }}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Your Tasks</h2>
                                <div className="text-sm text-gray-500">
                                    {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Loading tasks...</p>
                                </div>
                            ) : todos.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-600 mb-2">No tasks available</p>
                                    <p className="text-sm text-gray-500">Add a task to get started!</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    {/* Mobile Card View */}
                                    <div className="block lg:hidden space-y-4">
                                        {todos.map((todo) => (
                                            <div key={todo.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h3 className={`font-medium ${todo.status === "Done" ? "line-through text-gray-500" : "text-gray-900"}`}>
                                                            {todo.task}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                            <Calendar className="w-4 h-4" />
                                                            {todo.date}
                                                        </div>
                                                    </div>
                                                    {getStatusBadge(todo.status)}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => startEditTask(todo.id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                    >
                                                        <Edit3 className="w-3 h-3" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteTask(todo.id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => window.location.href = `/task/${todo.id}`}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                                                    >
                                                        <Eye className="w-3 h-3" />
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => {todo.status === 'Done' ? setUndo(todo.id) : setDone(todo.id)}}
                                                        className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                                                            todo.status === 'Done' 
                                                                ? 'text-amber-600 hover:bg-amber-50' 
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                    >
                                                        {todo.status === 'Done' ? (
                                                            <>
                                                                <RotateCcw className="w-3 h-3" />
                                                                Undo
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Check className="w-3 h-3" />
                                                                Done
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Desktop Table View */}
                                    <div className="hidden lg:block">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Task
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {todos.map((todo) => (
                                                    <tr key={todo.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                {getStatusIcon(todo.status)}
                                                                <span className={`ml-3 text-sm font-medium ${todo.status === "Done" ? "line-through text-gray-500" : "text-gray-900"}`}>
                                                                    {todo.task}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div className="flex items-center">
                                                                <Calendar className="w-4 h-4 mr-2" />
                                                                {todo.date}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {getStatusBadge(todo.status)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => startEditTask(todo.id)}
                                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                                                                    title="Edit task"
                                                                >
                                                                    <Edit3 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteTask(todo.id)}
                                                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                                                                    title="Delete task"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => window.location.href = `/task/${todo.id}`}
                                                                    className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                                                                    title="View task"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => {todo.status === 'Done' ? setUndo(todo.id) : setDone(todo.id)}}
                                                                    className={`p-1 rounded transition-colors ${
                                                                        todo.status === 'Done' 
                                                                            ? 'text-amber-600 hover:text-amber-900 hover:bg-amber-50' 
                                                                            : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                                                                    }`}
                                                                    title={todo.status === 'Done' ? 'Mark as pending' : 'Mark as done'}
                                                                >
                                                                    {todo.status === 'Done' ? (
                                                                        <RotateCcw className="w-4 h-4" />
                                                                    ) : (
                                                                        <Check className="w-4 h-4" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}