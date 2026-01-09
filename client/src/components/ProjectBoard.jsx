import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle, Circle, Clock, Trash2 } from 'lucide-react';
import { getProject, getTasks, createTask, updateTaskStatus, deleteTask } from '../services/api';
import CreateTaskModal from './CreateTaskModal';

const ProjectBoard = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [projectRes, tasksRes] = await Promise.all([
                getProject(id),
                getTasks(id)
            ]);
            setProject(projectRes.data);
            setTasks(tasksRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            await createTask(taskData);
            setIsModalOpen(false);
            fetchData(); // Refresh tasks
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            // Optimistic update
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
            await updateTaskStatus(taskId, newStatus);
        } catch (error) {
            console.error('Error updating status:', error);
            fetchData(); // Revert on error
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(t => t._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    if (loading) return <div className="text-center py-10">Loading board...</div>;
    if (!project) return <div className="text-center py-10">Project not found</div>;

    const columns = [
        { name: 'Pending', status: 'Pending', icon: Circle, color: 'text-gray-500' },
        { name: 'In Progress', status: 'In Progress', icon: Clock, color: 'text-blue-500' },
        { name: 'Done', status: 'Done', icon: CheckCircle, color: 'text-green-500' }
    ];

    return (
        <div>
            <div className="mb-6">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Dashboard
                </Link>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                        <p className="text-gray-500 mt-1">{project.description}</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus size={20} />
                        <span>Add Task</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {columns.map((col) => (
                    <div key={col.status} className="bg-gray-50 rounded-xl p-4 min-h-[500px]">
                        <div className="flex items-center space-x-2 mb-4">
                            <col.icon size={20} className={col.color} />
                            <h2 className="font-semibold text-gray-700">{col.name}</h2>
                            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                                {tasks.filter(t => t.status === col.status).length}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {tasks.filter(t => t.status === col.status).map(task => (
                                <div key={task._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition group">
                                    <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
                                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                        <span>{task.assigneeName || 'Unassigned'}</span>
                                        {task.dueDate && <span>{new Date(task.dueDate).toLocaleDateString()}</span>}
                                    </div>

                                    <div className="pt-3 border-t flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            {col.status !== 'Pending' && (
                                                <button
                                                    onClick={() => handleStatusChange(task._id, 'Pending')}
                                                    className="text-xs hover:bg-gray-100 px-2 py-1 rounded"
                                                >To Pending</button>
                                            )}
                                            {col.status !== 'In Progress' && (
                                                <button
                                                    onClick={() => handleStatusChange(task._id, 'In Progress')}
                                                    className="text-xs hover:bg-blue-50 text-blue-600 px-2 py-1 rounded"
                                                >To Progress</button>
                                            )}
                                            {col.status !== 'Done' && (
                                                <button
                                                    onClick={() => handleStatusChange(task._id, 'Done')}
                                                    className="text-xs hover:bg-green-50 text-green-600 px-2 py-1 rounded"
                                                >To Done</button>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <CreateTaskModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateTask}
                    projectId={id}
                />
            )}
        </div>
    );
};

export default ProjectBoard;
