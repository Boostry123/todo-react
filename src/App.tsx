import React from 'react';
import  TaskList  from './components/TaskList';
import useTaskFunctions from './components/Functions';

const App = () => {
  const { tasks, newTask, setNewTask, addTask, toggleTask, removeTask } = useTaskFunctions();

  return (
    <div>
      <h1>📝 To-Do List</h1>

      <input
        type="text"
        placeholder="Type your new task here"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      
      <button onClick={addTask}>Add Task</button>

      <TaskList tasks={tasks} toggleTask={toggleTask} removeTask={removeTask} />
    </div>
  );
};

export default App;


