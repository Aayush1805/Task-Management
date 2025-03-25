import { useState } from 'react';

//for each task assigning use as per the need
export default function Task({ task, onDelete, onUpdate }) {
  const [completed, setCompleted] = useState(task.completed || false);

  const handleToggleComplete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      // console.log(response);

      // for  correctly updating the task
      if (response.ok) {
        const updatedTask = await response.json();
        setCompleted(updatedTask.completed); // update local state
        onUpdate(updatedTask); // update parent state
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className='w-sm max-w-md bg-yellow-100 border shadow-md p-4 rounded-lg flex flex-col gap-3 mb-3'>
      <div>
        <h3
          className={`text-xl text-gray-700 font-semibold ${
            completed ? 'line-through text-gray-500' : 'text-gray-800' //if completed then applying line-through
          }`}
        >
          {task.title}
        </h3>
        <p
          className={`text-md text-gray-700 ${
            completed ? 'line-through text-gray-500' : 'text-gray-800' //if completed then applying line-through
          }`}
        >
          {task.description}
        </p>
      </div>

      <div className='flex items-center justify-between'>
        <label className='flex items-center gap-2 text-gray-800'>
          <input
            type='checkbox'
            className='w-5 h-5 text-blue-600 cursor-pointer'
            checked={completed}
            onChange={handleToggleComplete}   //handling the compltion of task if checked
          />
          Mark as done
        </label>


      
        <button // button to delete the task
          onClick={() => onDelete(task._id)}  
          className='bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 transition cursor-pointer'
        >
          Delete
        </button>
      </div>
    </div>
  );
}
