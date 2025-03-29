import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

import TaskItem from "./Task";
import {Task} from "./Task";

//the types of what the TaskList function will recive
type durationStatusArrayType<T,U> = [T,U];

interface TaskListProps{
  tasks: Task[];
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  durationStatus: (task: Task) => durationStatusArrayType<string,number>;
}



/*The main task list that will be rendered on the screen, recives main functions to add ,toggle , remove and setDurationStatus tasks.
Params: tasks
        toggleTask
        removeTask
        durationStatus
returns: React component TaskList
*/
const TaskList = ({ tasks, toggleTask, removeTask, durationStatus }: TaskListProps) => {

  return (
    <div className = "task-list">
          <ul>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} toggleTask={toggleTask} removeTask={removeTask} durationStatus={durationStatus} />
            ))}
            </SortableContext>
          </ul>
    </div>
  );
};

export default TaskList;
