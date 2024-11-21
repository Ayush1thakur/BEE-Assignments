const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('courseList', { courses, title: 'Courses List' });
    } catch (err) {
        res.status(500).send('Error retrieving courses');
    }
});

// Show add course form
router.get('/courses/add', (req, res) => {
    res.render('addCourse', { title: 'Add Course' });
});

// Add a new course
router.post('/courses/add', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send('Course name is required');
    }

    try {
        const course = new Course({ name });
        await course.save();
        res.redirect('/courses');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding course');
    }
});

// Show edit course form
router.get('/courses/edit/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.render('editCourse', { course, title: 'Edit Course' });
    } catch (err) {
        res.status(500).send('Error retrieving course');
    }
});

// Edit course
router.post('/courses/edit/:id', async (req, res) => {
    const { name } = req.body;

    try {
        const course = await Course.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.redirect('/courses');
    } catch (err) {
        res.status(500).send('Error updating course');
    }
});

// Delete course
router.post('/courses/delete/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.redirect('/courses');
    } catch (err) {
        res.status(500).send('Error deleting course');
    }
});

module.exports = router;
