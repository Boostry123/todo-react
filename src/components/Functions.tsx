import React from 'react';
import { useState } from 'react';
import  {Task}  from './TaskList';



const TaskFunctions = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    const addTask = () => {
        if (!newTask.trim()) return;

        const newTaskItem: Task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        };

        setTasks([...tasks, newTaskItem]);
        setNewTask('');
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map((task : Task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };
    return { tasks, newTask, setNewTask, addTask, toggleTask, removeTask };
}

export default TaskFunctions;