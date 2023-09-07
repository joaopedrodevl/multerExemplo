const express = require('express');
const path = require('path');

const upload = require('./config/multer').single('imagem');

const app = express();

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/profile', (req, res) => {
    return upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                errors: [err.code],
            });
        }
        return res.json({
            message: `http://localhost:3000/images/${req.file.filename}`,
        });
    });
});

// Middleware
app.use('/images', express.static(path.resolve(__dirname, '..', 'public', 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is up on port http://localhost:3000.');
});