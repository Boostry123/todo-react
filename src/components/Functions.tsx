import  { useEffect } from 'react';
import { useState } from 'react';
import  {Task}  from './TaskList';
import axios from 'axios';
import moment from 'moment';

//main function that holds all functionality of the App
const TaskFunctions = () => {
    const [tasks, setTasks] = useState<Task[]>([]); //A custom array that hold all the tasks
    const [newTask, setNewTask] = useState<string>(''); //container to hold the new inputed task before it added to the list
    const [render, setRender] = useState<boolean>(false); //used purely to rerender the tasks list
    const [duration, setDuration] = useState<string>('null'); //used to set the duration of the task

    //function that renders the tasks recived from the database, if recived empty array it will render an empty task list. sets render back to false.
    useEffect(() => {
         axios.get<Task[]>('http://localhost:5000')
            .then(async( response )=> {
                try {
                    if(response.data.length === 0){
                        const response = await axios.put<Task[]>('http://localhost:5000/api/put');
                        console.log(response.status)
                        const newTasks : Task[]= [] ;
                        setTasks(newTasks);
                    }else{
                        setTasks(response.data)
                        console.log('status code: ', response.status)
                    }
                } catch (error : any) {
                    console.error(error.message)
                }
                
                })
            .catch((error) => console.error(error));

            setRender(false);
        }, [render]);

    //function that checks the duration of the task and returns a color accordingly to the days passed from the creation of the task.       
        type durationStatusArrayType<T,U> = [T,U];
        function durationStatus(task: Task) : durationStatusArrayType<string,number>{
        const passedDays = Math.abs(moment(task.datecreated, "DD/MM/YYYY").diff(moment(), 'days'));
        let status : durationStatusArrayType<string,number> = ["green",0];
            if(parseInt(task.duration)){
                const daysLeft = (parseInt(task.duration) - passedDays) < 1? 0 : parseInt(task.duration) - passedDays ;

                if (daysLeft < 2){
                    status = ["red",daysLeft];
                }else if(daysLeft <= 3){
                    status = ["orange",daysLeft];
                }else{
                    status = ["green",daysLeft];
                }
                
            }else{
                status[0] = 'transparent';
           } 
        

        return status;
    };


//function for adding tasks , uses API to take the new inputed task to the database.
    const addTask = async () => {
        if (!newTask.trim()) return;

        try{
            const response = await axios.post<[Task,number]>('http://localhost:5000/api/add', [newTask, duration]);
            console.log(response.status);
            setNewTask('');
            setDuration('null');
            setRender(true);
        }catch(err : any){
            console.error(err.message);
        }
    };
//checkmark that controls weather the task is marked completed or not, cannot remove item if task is not marked complete.
    const toggleTask = async(id: number) => {
        try {
            await axios.patch<number>('http://localhost:5000/api/patch', { params : id})
            console.log(`ID: ${id} have been marked ${tasks.find((task) => (task.id === id))?.completed ? 'Not Complete' : 'Complete'}`)
            setRender(true);
        } catch (error : any) {
            console.error(error.message)
        }

    };

//removes the task from the database , checks if task is completed , if not it wont remove the task.
    const removeTask = async(id: number) => {
        const task : Task | undefined = tasks.find((task) => (task.id === id))
        
        try{
            if(task){
                if(task.completed === true){
                    console.log(task)
                    await axios.delete(`http://localhost:5000/api/delete/${id}`);
                    console.log(`ID: ${id} have been removed`)
                    setRender(true);
                }else{
                    const checkbox = document.getElementById(task.id.toString());
                    if (checkbox) {
                        checkbox.classList.add("checked");
                    } else {
                        console.error(`Checkbox with ID ${task.id} not found.`);
                    }
                }
                
            }else{
                console.log("no such ID")
            }
        }catch(err : any){
            console.error(err.message);
        }
        
    };
    //returning all functions that will be used by other components
    return { tasks, newTask, setNewTask, addTask, toggleTask, removeTask,setDuration,durationStatus };
}

export default TaskFunctions;