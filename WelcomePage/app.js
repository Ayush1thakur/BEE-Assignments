const express = require('express');
const path = require('path');
const db = require('./db');

const todoRoutes = require('./routes/todoRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));

// Use modular routes
app.use('/', todoRoutes);
app.use('/', productRoutes);
app.use('/', contactRoutes);
app.use('/', studentRoutes);
app.use('/', courseRoutes);

// Start the server
const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
