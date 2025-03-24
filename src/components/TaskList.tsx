//defining the Task object and its structure.
export interface Task{
    id: number;
    text: string;
    completed: boolean;
    datecreated: string;
  }
//the types of what the TaskList function will recive
interface TaskListProps{
  tasks: Task[];
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}
//The main task list that will be rendered on the screen, recives main functions to add ,toggle , remove tasks.
const TaskList = ({ tasks, toggleTask, removeTask }: TaskListProps) => {
  return (
    <div className = "task-list">
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input 
                  id={task.id.toString()}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  />
              <span key={task.id} className="text">
                {task.text}
              </span>
              <div className="task-actions">
                <button className="remove-btn" onClick={() => removeTask(task.id)}>❌</button>
                <span className = "dateCreated">{task.datecreated}</span>
              </div>
              
              </li>
              
            ))}
          </ul>
    </div>
  );
};

export default TaskList;
