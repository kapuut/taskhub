const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/taskhub');

app.use('/tasks', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
