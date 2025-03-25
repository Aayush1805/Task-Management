const express = require('express');
const cors = require('cors')
const Task = require('./db');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// this endpoint fetches all the available tasks from the db
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      res.status(411).json({
        msg: 'No task found',
      });
    }

    res.status(200).json({
      tasks,
    });
  } catch (err) {
    console.error('Error fetching tasks: ', err);
    res.status(500).json({
      msg: 'Error fetching tasks',
    });
  }
});

// this endpoint is for creating new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      msg: 'Missing values.',
    });
  }
  try {
    const newTask = await new Task({
      title,
      description,
      completed: false,
    }).save();

    // await newTask.save()

    res.status(201).json({
    //   id,
      msg: 'Task successfully added.',
    });
  } catch (err) {
    console.error('Error creating new task: ', err);
  }
});

// this endpoint is for updating already existing task

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

// this endpoint is used for deleting existing task.

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
          return res.status(404).json({ msg: "Task not found" });
      }

      res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
      res.status(500).json({ msg: "Error deleting task", error });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
