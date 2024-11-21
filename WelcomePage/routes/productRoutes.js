const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Route for products page
router.get('/products', (req, res) => {
    const uploadedImage = req.query.filename || null;
    res.render('products', { 
        title: "Products", 
        message: "Welcome to the Products Page!", 
        uploadedImage 
    });
});

// Route to handle image upload
router.post('/products/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.redirect(`/products?filename=${req.file.filename}`);
});

module.exports = router;
