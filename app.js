require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const connectDB = require('./src/config/db');


const port = process.env.PORT || 6000;

const userRoutes = require('./src/routes/user.routes');
const bookRoutes = require('./src/routes/book.routes');


app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the Book Library Manager API');
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});