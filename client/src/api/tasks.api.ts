import axios from 'axios';
import {TaskProp} from '../types/types';

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})

export function getAllTasks() {
    return taskApi.get('/')
}

export function getTask(id: number) {
    return taskApi.get(`/${id}/`)
}

export function createTask(task: TaskProp) {
    return taskApi.post('/', task)
}

export function deleteTask(id: number) {
    return taskApi.delete(`/${id}`)
}

export function updateTask(id: number, task: TaskProp) {
    return taskApi.put(`/${id}/`, task)
}
