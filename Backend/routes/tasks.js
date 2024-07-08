const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Task = require('../models/Task');
const User = require('../models/User');

const router = express.Router();

router.post('/tasks', verifyToken, async (req, res) => {
    const { title } = req.body;
    const task = await Task.create({ title, userId: req.userId });
    res.status(201).json(task);
});

router.get('/tasks', verifyToken, async (req, res) => {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.json(tasks);
});

router.put('/tasks/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (task) {
        task.title = title;
        task.completed = completed;
        await task.save();
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

router.delete('/tasks/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (task) {
        await task.destroy();
        res.json({ message: 'Task deleted' });
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

module.exports = router;