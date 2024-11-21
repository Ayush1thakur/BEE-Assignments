const express = require('express');
const router = express.Router();

let tasks = [];

// Route for the homepage with loader and to-do list
router.get('/', (req, res) => {
    const data = {
        title: "Dynamic Page with To-Do List",
        message: "Welcome to the page!",
        tasks
    };
    res.render('index', data);
});

// Route to add a task
router.post('/todo/add', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

// Route to delete a task
router.post('/todo/delete', (req, res) => {
    const taskToDelete = req.body.taskToDelete;
    tasks = tasks.filter(task => task !== taskToDelete);
    res.redirect('/');
});

module.exports = router;
