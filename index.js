const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/test')
.then(() => {
    console.log("Connected to Database!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("Connection Failed!", err);
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello from Node API server');
});

// Import routes
const productRoutes = require('./routes/products');
const favoriteRoutes = require('./routes/favorites');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/favorites', favoriteRoutes);
