import {DndContext, closestCorners} from '@dnd-kit/core';

import AddTaskContainer from './components/AddTaskContainer';
import  TaskList  from './components/TaskList';
import TaskFunctions from './components/Functions';




const App = () => {
  //importing various functions that the Main app would use
  const { tasks, newTask, setNewTask, addTask, toggleTask, removeTask, setDuration,durationStatus,handleDragEnd } = TaskFunctions();

  return (
    <div className = "main">
      <h1>To-Do List</h1>

      <AddTaskContainer newTask={newTask} setNewTask={setNewTask} addTask={addTask} setDuration={setDuration} />
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <TaskList tasks={tasks} toggleTask={toggleTask} removeTask={removeTask} durationStatus={durationStatus} />
      </DndContext>
    </div>
  );
};

export default App;


