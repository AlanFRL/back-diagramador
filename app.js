// File: app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const diagramRoutes = require('./routes/diagramRoutes');

const app = express();

app.use(cors({
    //origin: 'http://localhost:4200'
    origin: 'https://harmonious-fox-f44c67.netlify.app'
  }));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/diagrams', diagramRoutes);


  
// Sincronizar modelos con la base de datos
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

module.exports = app;
