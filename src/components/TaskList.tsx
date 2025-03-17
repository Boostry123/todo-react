export interface Task{
    id: number;
    text: string;
    completed: boolean;
  }

interface TaskListProps{
  tasks: Task[];
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const TaskList = ({ tasks, toggleTask, removeTask }: TaskListProps) => {
  return (
    <div className = "task-list">
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  />
              <span key={task.id}>
                {task.text}
              </span>
              <button className="remove-btn" onClick={() => removeTask(task.id)}>❌</button>
              </li>
            ))}
          </ul>
    </div>
  );
};

export default TaskList;
