const express = require('express');
const router = express.Router();

// Route to display the contact page
router.get('/contact', (req, res) => {
    res.render('contact', { 
        title: "Contact Us", 
        message: "We would love to hear from you!" 
    });
});

// Route to handle form submission
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact Form Submission:", { name, email, message });
    res.render('output', { message });
});

module.exports = router;
