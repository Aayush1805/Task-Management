import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {

  //making state variables and assigning default values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  //using navigate to redirect as per the need
  const navigate = useNavigate();

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // for preventing direct submit
    setError(""); //

    if (!title || !description) {
      setError("Both fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/tasks", { title, description });
      navigate("/"); // redirect user to tasklist
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task.");
    }
  };

  return (

    // adding new task
    <div className="w-sm mx-auto p-6 bg-yellow-100 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* handling on submit of button */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 

        {/* populating the state variable after change in the value */}

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-md"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md"
        ></textarea>
        

        {/* adding task to task list */}

        <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
