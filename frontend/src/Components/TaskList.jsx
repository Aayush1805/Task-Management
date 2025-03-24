import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description} - {task.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
