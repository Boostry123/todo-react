import React from 'react';
import { useState } from 'react';
import  {Task}  from './TaskList';
import axios from 'axios';



const TaskFunctions = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    const addTask = async () => {
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
        setTasks(tasks.filter((task : Task) => (task.id === id && task.completed === true)? false :task));
    };
    return { tasks, newTask, setNewTask, addTask, toggleTask, removeTask };
}

export default TaskFunctions;