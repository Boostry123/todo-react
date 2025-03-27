//the types which Task container will receive
interface TaskProps{
    newTask: string
    setNewTask: (task: string) => void;
    addTask: () => void;
    setDuration: (duration: string) => void;
}
//array of numbers from 0 to 30 , used to give the user a choice of how many days the task will last.
const durationDays : string[] = ['unlimited'];
for(let i = 1; i <= 30; i++){
    durationDays.push(i.toString());
}


/*component of the container holding the place where the user can input a new task as a string and add it to the tasks database
Params: newTask
        setNewTask
        addTask
        setDuration
returns: React component
*/
const AddTaskContainer = ({ newTask, setNewTask, addTask,setDuration } : TaskProps) => {
    return (
        <div id="addTaskContainer">
            <input
                type="text"
                placeholder="Type your new task here"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value,)}
            />
            
            <div className="durationContainer">
                <label htmlFor="duration">Set Duration (days) : </label>
                <select name="duration" id="duration" onChange={(e) => setDuration(e.target.value)}>
                    {durationDays.map((day) => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                
            </div>
            
            <button onClick={addTask}>Add Task</button>
        </div>
      
    );
}

export default AddTaskContainer;