//the types which Task container will receive
interface TaskProps{
  
  newTask: string
  setNewTask: (task: string) => void;
  addTask: () => void;
}
//component of the container holding the place where the user can input a new task as a string and add it to the tasks database
const AddTaskContainer = ({ newTask, setNewTask, addTask } : TaskProps) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Type your new task here"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />         
            <button onClick={addTask}>Add Task</button>
        </div>
      
    );
}

export default AddTaskContainer;