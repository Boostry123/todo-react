import React, { useEffect } from 'react';
import { useState } from 'react';
import  {Task}  from './TaskList';
import axios from 'axios';



const TaskFunctions = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [render, setRender] = useState<boolean>(false);

    useEffect(() => {
         axios.get<Task[]>('http://localhost:5000')
            .then(async( response )=> {
                try {
                    if(response.data.length === 0){
                        const result = await axios.put<Task[]>('http://localhost:5000/api/put');
                        const newTasks : Task[]= [] ;
                        setTasks(newTasks);
                    }else{
                        setTasks(response.data)
                    }
                } catch (error : any) {
                    console.error(error.message)
                }
                
                })
            .catch((error) => console.error(error));

            setRender(false);
        }, [render]);



    const addTask = async () => {
        if (!newTask.trim()) return;

        try{
            const response = await axios.post<Task>('http://localhost:5000/api/add', [newTask])
            setNewTask('');
            setRender(true);
        }catch(err : any){
            console.error(err.message);
        }
    };

    const toggleTask = async(id: number) => {
        try {
            const response = await axios.patch<number>('http://localhost:5000/api/patch', { params : id})
            setRender(true);
        } catch (error : any) {
            console.error(error.message)
        }

    };


    const removeTask = async(id: number) => {
        const task : Task | undefined = tasks.find((task) => (task.id === id && task.completed === true))
        
        try{
            if(task){
                console.log(task)
                const response = await axios.delete(`http://localhost:5000/api/delete/${id}`);
                console.log(`ID: ${id} have been removed`)
                setRender(true);
            }else{
                console.log("no such ID or it is marked as uncomplete")
            }
        }catch(err : any){
            console.error(err.message);
        }
        
    };
    return { tasks, newTask, setNewTask, addTask, toggleTask, removeTask };
}

export default TaskFunctions;