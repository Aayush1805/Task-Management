import { useEffect, useState } from "react";
import axios from "axios";
import Task from "../Components/task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // fetching all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // handle task deletion
  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // handle updating of task
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  //mapping the task

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="flex items-center flex-col">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task key={task._id} task={task} onDelete={handleDelete} onUpdate={handleTaskUpdate} />
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
