const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware-uri esențiale
app.use(cors());
app.use(express.json());

// Rute principale
const sportsRoutes = require('./routes/sportsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use('/sports', sportsRoutes);
app.use('/students', studentsRoutes);
app.use('/users', usersRoutes);

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
