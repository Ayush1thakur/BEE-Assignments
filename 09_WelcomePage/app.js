const express = require('express');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
    const data = { title: "Dynamic Page", message: "Welcome to EJS dynamic page!" };
    res.render('index', data);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
