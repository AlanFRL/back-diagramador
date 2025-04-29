// File: server.js
const app = require('./app');
const config = require('./config/config');
require('dotenv').config();


const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
