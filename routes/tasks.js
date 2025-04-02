const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const authenticateToken = require("../middleware/auth");

// apply authentication
router.use(authenticateToken);

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    res.status(500).json({ message: "Error fetching tasks!" });
  }
});

// Post a new task
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Task cannot be empty!" });
    }

    const newTask = new Task({
      userId: req.user.userId,
      text,
      completed: false,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error create a new task: ", error);
    res.status(500).json({ message: "Error creating new task!" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId }, // filter
      { text, completed }, // update content
      { new: true } // options, return new document after update
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task: ", error);
    res.status(500).json({ message: "Error updating task!" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({ message: "Task deleted!" });
  } catch (error) {
    console.error("Error deleting task: ", task);
    res.status(500), json({ message: "Error deleting task!" });
  }
});

module.exports = router;

// req.body: request input
// req.params: in url
// req.user: middleware, logged in user info
