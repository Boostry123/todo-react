import {useSortable} from "@dnd-kit/sortable";
import {CSS } from "@dnd-kit/utilities";
import e from "express";

//defining the Task object and its structure.
export type Task ={
    id: number;
    text: string;
    completed: boolean;
    datecreated: string;
    duration: string;
    order: number;
  }


//the types of what the TaskList function will recive
type durationStatusArrayType<T,U> = [T,U];

interface TaskItemPropsTypes{
  task: Task;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  durationStatus: (task: Task) => durationStatusArrayType<string,number>;
}

/*
Task Item that will be rendered on the screen , recives main functions to add ,toggle , remove and setDurationStatus tasks.
Params: task
        toggleTask
        removeTask
        durationStatus
returns: React component TaskItem
*/ 
const TaskItem = ({ task, toggleTask, removeTask, durationStatus} : TaskItemPropsTypes)  => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id});
  const styleDnd = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
    return(
            <li ref={setNodeRef} {...attributes} {...listeners} style={styleDnd} key={task.id} >
              <span className="dragHandle" {...attributes} {...listeners} style={{cursor: "grab",marginRight:'10px',fontSize:'20px'}}>☰</span>
              <input 
                id={task.id.toString()}
                type="checkbox"
                checked={task.completed}
                onPointerDown={(e) => e.preventDefault()}
                onChange={(e) =>  toggleTask(task.id)}
                />
            <span key={task.id} className="text">
              {task.text}
            </span>

            <span className="duration" style={{color:durationStatus(task)[0],borderColor:durationStatus(task)[0]}}>{durationStatus(task)[1]}</span>
            <div className="task-actions">
              
              <button className="remove-btn" onClick={() => removeTask(task.id) }onPointerDown={(e) => e.preventDefault()}>❌</button>
              <span className = "dateCreated" >{task.datecreated}</span>
              
            </div>
            
            </li>
    );
}
export default TaskItem;