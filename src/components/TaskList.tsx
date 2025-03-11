export interface Task{
    id: number;
    title: string;
    completed: boolean;
  }

interface TaskListProps{
  tasks: Task[];
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const TaskList = ({ tasks, toggleTask, removeTask }: TaskListProps) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input 
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            />
        <span key={task.id}>
          {task.title}
        </span>
        <button onClick={() => removeTask(task.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
