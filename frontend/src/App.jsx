import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddTask from "./Pages/AddTask";
import TaskList from "./Pages/TaskList";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Task Management</h1>
        
        {/* Navigation */}
        <nav className="w-50 mb-6 flex justify-between">
          <div className='w-24 flex items-center justify-center h-10 bg-amber-400 rounded-md border'><Link to="/" className="text-lg  hover:underline">Task List</Link></div>
          <div className='w-24 flex items-center justify-center h-10 bg-amber-400 rounded-md border'><Link to="/addTask" className="text-lg  hover:underline">Add Task</Link></div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/addTask" element={<AddTask />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
