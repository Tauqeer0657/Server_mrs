// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors middleware
const connectDB = require('./config/db');
const assignmentRoutes = require('./routes/assignmentRoutes');
const userRoutes = require('./routes/userRoutes')

const cookieParser = require('cookie-parser');

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());


// Assign the assignment routes
app.use('/assignments', assignmentRoutes);

// Assign the login routes
app.use('/user', userRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
