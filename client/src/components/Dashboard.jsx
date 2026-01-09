import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, ArrowRight } from 'lucide-react';
import { getProjects, createProject } from '../services/api';
import CreateProjectModal from './CreateProjectModal';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await getProjects();
            setProjects(res.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (projectData) => {
        try {
            await createProject(projectData);
            setIsModalOpen(false);
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    if (loading) return <div className="text-center py-10">Loading projects...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    <span>New Project</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 truncate">{project.name}</h3>

                        </div>
                        <p className="text-gray-600 mb-6 line-clamp-2 h-12">{project.description}</p>

                        <div className="flex items-center text-gray-500 text-sm mb-6">
                            <Calendar size={16} className="mr-2" />
                            <span>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'No Deadline'}</span>
                        </div>

                        <Link
                            to={`/project/${project._id}`}
                            className="flex items-center justify-center w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                        >
                            View Board
                            <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <CreateProjectModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateProject}
                />
            )}
        </div>
    );
};

export default Dashboard;
