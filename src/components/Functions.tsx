import React, { useEffect } from 'react';
import { useState } from 'react';
import  {Task}  from './TaskList';
import axios from 'axios';



const TaskFunctions = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        axios.get<Task[]>('http://localhost:5000')
            .then((response )=> setTasks(response.data))
            .catch((error) => console.error(error));
        }, []);



    const addTask = async () => {
        if (!newTask.trim()) return;

        try{
            const response = await axios.post<Task>('http://localhost:5000/api/add', [newTask])
            const newTaskItem: Task = response.data;
            setTasks([...tasks, newTaskItem]);
            setNewTask('');
        }catch(err : any){
            console.error(err.message);
        }
        


    };

    const toggleTask = async(id: number) => {
        try {
            const response = await axios.patch('http://localhost:5000/api/patch', { params : id})
        } catch (error : any) {
            console.error(error.message)
        }
        setTasks(tasks.map((task : Task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };


    const removeTask = async(id: number) => {
        const task : Task[] = tasks.filter((task) => (task.id === id && task.completed === true)?true:false)
        console.log(task)
        try{
            if(task[0]){
                const response = await axios.delete('http://localhost:5000/api/delete',{ params : id })
            }
        }catch(err : any){
            console.error(err.message);
        }
        
    };
    return { tasks, newTask, setNewTask, addTask, toggleTask, removeTask };
}

export default TaskFunctions;