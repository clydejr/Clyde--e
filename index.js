const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const Book = require('./models/book.js');
const Institution = require('./models/institution.js');
const User = require('./models/user.js');

// Import the mongoose module
var mongoose = require('mongoose'); //Set up
var mongoDB = 'mongodb://school:pw4school@ds123532.mlab.com:23532/school';
mongoose.connect(mongoDB);

const index = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', index);

// const book = new User({Name: 'Clyde', Email: 'c@clyde.com', Role:
// ['academic'], Password: 'pw4clyde'}) book.save((err) => {    if (!err) {
// console.log('new book saved');    } })

app.post('/users/create', (req, res) => {
   console.log('creating user');
   /// check for matching domains
   User.find({
      Email: req.body.Email
   }, (err, _user) => {
      if (_user.length === 0) {
         Institution.find({
            EmailDomain: req
               .body
               .Email
               .split('@')[1]
         }, (err, institution) => {
            if (institution.length === 0) {
               res.json({
                  status: 'error',
                  data: {
                     message: 'no institution found'
                  }
               })
            } else {
               const user = new User(req.body);
               console.log(user);
               user.save(() => {
                  res.json({
                     status: 'success',
                     data: {
                        user: user
                     }
                  })
               })
            }
         })
      } else {
         res.json({
            status: 'error',
            data: {
               message: 'email already exists'
            }
         })
      }
   })
   // Institution.find({}, (err, institution) => {    institution.map((i) => {
   // console.log(i.EmailDomain);       if (req.body.Email.split('@')[1] ===
   // i.EmailDomain) {          console.log('match');          const user = new
   // User(req.body);          console.log(user);       } else { res.json({ status:
   // 'error',             data: { message: 'no institution found'        }  }) }
   // }) })

})

app.post('/users/signin', (req, res) => {
   console.log('user sign in');
   console.log(req.body);
   res.json({
      status: "success",
      data: {
         books: []
      }
   })
})

app.get('/books', (req, res) => {
   console.log('getting books');
   res.json({
      status: "success",
      data: {
         books: []
      }
   })
})

app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));