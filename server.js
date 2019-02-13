const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const passport = require('passport');
// so we can work with environment variable
// require('dotenv').config()
// route files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const todos = require('./routes/api/todos');
const pictures = require('./routes/api/pictures');
const hikes = require('./routes/api/hikes');
const locations = require('./routes/api/locations');
const comments = require('./routes/api/comments')

app.use(cors())

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;
  // process.env.MONGOLAB_URI ||
  // process.env.MONGOHQ_URL ||

// Connect to MondoDB
mongoose.connect(db, { useNewUrlParser: true })
  // .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/todos', todos);
app.use('/api/hikes', hikes);
app.use('/api/comments', comments)

// app.use('/api/pictures', pictures);
// app.use('/api/bottles', bottles);
// app.use('/api/locations', locations)

// if app is not an api route then check if file is in client build
/// then serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next()
    }
  })
  app.use(express.static('client/build'))

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


app.listen(port, () => console.log(`Listening on port ${port}`))
