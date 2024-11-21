const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');


router.get('/students', async (req, res) => {
    try {
        const students = await Student.find().populate('courses', 'name');
        const courses = await Course.find();  // Ensure courses are passed
        res.render('studentList', { students, courses, title: 'Students List' });
    } catch (err) {
        res.status(500).send('Error retrieving students');
    }
});

// Get students by course (filter)
router.get('/students/filter', async (req, res) => {
    try {
        const courseId = req.query.courseId;
        const courses = await Course.find();  // Get all courses to populate the filter dropdown

        let students;

        if (courseId) {
            // If a course is selected, filter students by the course
            students = await Student.find({ courses: courseId }).populate('courses', 'name');
        } else {
            // Otherwise, show all students
            students = await Student.find().populate('courses', 'name');
        }

        res.render('studentList', {
            students,
            courses,  // Pass courses for dropdown filtering
            title: 'Students List',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving students by course');
    }
});

router.get('/students/add', async (req, res) => {
    try {
        const courses = await Course.find(); // Get all courses or filter specific ones
        res.render('addStudent', { courses, title: 'Add Student' });  // Passing title
    } catch (err) {
        res.status(500).send('Error loading courses');
    }
});


// Add a new student
router.post('/students/add', async (req, res) => {
    const { name, age, grade, courses } = req.body;
    if (!courses) {
        return res.status(400).send('Courses field is required');
    }

    const courseNames = courses.split(',').map(course => course.trim());

    try {
        const validCourses = await Course.find({ name: { $in: courseNames } });

        // Ensure that at least one valid course was found
        if (validCourses.length === 0) {
            return res.status(400).send('No valid courses found');
        }

        // Extract course ObjectIds
        const validCourseIds = validCourses.map(course => course._id);

        // Create a new student with course ObjectIds
        const student = new Student({
            name,
            age,
            grade,
            courses: validCourseIds
        });

        await student.save();
        res.redirect('/students');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding student');
    }
});

// Edit student
router.post('/students/edit/:id', async (req, res) => {
    const { name, age, grade, courses } = req.body;

    // Check if courses field is provided
    if (!courses) {
        return res.status(400).send('Courses field is required');
    }

    const courseNames = courses.split(',').map(course => course.trim());

    try {
        // Find valid courses by name
        const validCourses = await Course.find({ name: { $in: courseNames } });

        // Ensure that at least one valid course was found
        if (validCourses.length === 0) {
            return res.status(400).send('No valid courses found');
        }

        const validCourseIds = validCourses
            .filter(course => courseNames.includes(course.name))
            .map(course => course._id);

        // Update student with the new course ObjectIds
        await Student.findByIdAndUpdate(req.params.id, {
            name,
            age,
            grade,
            courses: validCourseIds,
        });
        res.redirect('/students');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating student');
    }
});

// Delete student
router.post('/students/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/students');
    } catch (err) {
        res.status(500).send('Error deleting student');
    }
});

module.exports = router;
