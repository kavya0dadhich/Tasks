const express = require('express');
const app = express();
const connect = require('./connoctDB');
const ADDTASK = require('./schema')
const bodyParser = require("body-parser");
const cors = require("cors");
// Connect to MongoDB
connect();
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors());

app.post('/add-task', async (req, res) => {
    let { tagName, title, description } = req.body;
    const result = await ADDTASK.create({
        tagName,
        title,
        description,
    })
    if (result) {
        res.status(200).send({ status: 200, statusText: "Task Created..." });
    }
    else {
        res.status(400).send({ status: 400, statusText: 'Failed to add task' });
    }
})


app.get('/task-list', async (req, res)=> {
    const tasks = await ADDTASK.find({});
    if (!tasks) {
        res.status(400).send({ status: 400, statusText: 'No tasks found' });
    }  else {
        res.status(200).send({ status: 200, statusText: tasks });
    }
})

app.get('/task-by-id/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        return res.status(400).send({ status: 400, statusText: 'Task ID is missing' });
      }
  
      const result = await ADDTASK.findById(taskId);
      if (!result) {
        return res.status(400).send({ status: 400, statusText: 'This is not a task' });
      } else {
        return res.status(200).send({ status: 200, result, statusText: 'Task is find' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 500, statusText: 'Server error' });
    }
});
app.delete('/delete-task', async (req, res) => {
    try {
      const taskId = req.body.id;
      if (!taskId) {
        return res.status(400).send({ status: 400, statusText: 'Task ID is missing' });
      }
  
      const result = await ADDTASK.findByIdAndDelete(taskId);
      if (!result) {
        return res.status(400).send({ status: 400, statusText: 'Failed to delete task' });
      } else {
        return res.status(200).send({ status: 200, statusText: 'Task deleted' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 500, statusText: 'Server error' });
    }
});
  

app.put('/update-task', async (req, res) => {
    const taskId = req.body.id;
    if (!taskId) {
        return res.status(400).send({ status: 201, statusText: 'Task ID is missing' });
    }
    const updateData = req.body;
    try {
        const result = await ADDTASK.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!result) {
            return res.status(400).send({ status: 400, statusText: 'Failed to update task' });
        }
        res.status(200).send({ status: 200, statusText: 'Task updated successfully', updatedTask: result });
    } catch (error) {
        res.status(500).send({ status: 500, statusText: 'Internal server error', error });
    }
});



// Start the server
app.listen(8000, () => {
  console.log(`Example app listening on port ${8000}`)
})