//const jwt = require('jsonwebtoken');
const error = require('./middleware/error')
const config = require('config');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/users')
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if(config.has('jwtPrivateKey')){
  if(!config.get('jwtPrivateKey')){
    //console.log(process.env.vidly_jwtPrivateKey);
    console.error('Fetal Error - ');
    process.exit(1);
  }
};


mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));