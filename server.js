const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// route files
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const todos = require('./routes/api/todos');
const pictures = require('./routes/api/pictures');
const bottles = require('./routes/api/bottles');
const locations = require('./routes/api/locations');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MondoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/todos', todos);
app.use('/api/pictures', pictures);
app.use('/api/bottles', bottles);
app.use('/api/locations', locations)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`))
