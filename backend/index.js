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
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!title || !description || completed === undefined) {
    return res.status(400).json({
      msg: 'Values are required.',
    });
  }

  try {
    const task = await Task.findOneAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        msg: 'Task not found',
      });
    }

    res.status(200).json({
      msg: 'Task updated successfully.',
    });
  } catch (err) {
    console.error('Error updating task: ', err);
    return res.status(500).json({
      msg: 'Error updating tasks.',
    });
  }
});

// this endpoint is used for deleting existing task.

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        msg: 'Task not found',
      });
    }

    res.status(200).json({
      msg: 'Task deleted successfully.',
    });
  } catch (err) {
    console.err('Error deleting task: ', err);
    res.status(500).json({
      msg: 'Error deleting task.',
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
