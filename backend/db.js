require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: "",
        trim: true
    },

    completed: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task