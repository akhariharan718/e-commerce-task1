import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProjects = () => axios.get(`${API_URL}/projects`);
export const createProject = (project) => axios.post(`${API_URL}/projects`, project);
export const deleteProject = (id) => axios.delete(`${API_URL}/projects/${id}`);
export const getProject = (id) => axios.get(`${API_URL}/projects/${id}`);

export const getTasks = (projectId) => axios.get(`${API_URL}/tasks/${projectId}`);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);
export const updateTaskStatus = (id, status) => axios.put(`${API_URL}/tasks/${id}`, { status });
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);
