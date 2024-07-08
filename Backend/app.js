// app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
}).catch(err => {
    console.log('Failed to sync database:', err);
});