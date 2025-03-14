interface TaskProps{
  
  newTask: string
  setNewTask: (task: string) => void;
  addTask: () => void;
}

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