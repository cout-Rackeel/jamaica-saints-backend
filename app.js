require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();

//Router Middlewares

const campusRouter = require('./routes/campus.routes');
const saintRouter = require('./routes/saint.routes');
const residenceRouter = require('./routes/residence.routes');


app.use(cors(['*']));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(
  cookieSession({
    name : 'userSession',
    secret: process.env.COOKIE_SECRET,
    httpOnly : true,
    cookie:{maxAge:3000000},
    saveUninitialized: false,
    resave:true,
  })
)

// MIDDLEWARES
app.use((req, res, next) =>{
  switch (req.method){
    case 'DELETE':
        console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[31m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'PUT':
        console.log(`\x1b[44m\x1b[4m[ANGULAR-APP3.1]\x1b[0m - \x1b[32m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'PATCH':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[34m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'POST':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[33m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'GET':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[35m${req.method}\x1b[0m - ${req.path}`);
      break;
    default:
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[35m${req.method}\x1b[0m - ${req.path}`);
  }
  next();
});

app.get('/api/v1', (req,res) => {
  res.send(" OCOJ JAMAICA SAINTS API endpoints - genres , movies , users , auth");
});

app.use('/api/v1/campus', campusRouter);
app.use('/api/v1/saint', saintRouter);
app.use('/api/v1/residence', residenceRouter);



module.exports = app;