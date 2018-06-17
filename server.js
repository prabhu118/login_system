const dotenv                = require('dotenv').config({path:".env"});
const express               = require('express');
const http                  = require('http');
const port                  = process.env.PORT || 3000;
const logger                = require('morgan')
const cookieParser          = require('cookie-parser');
const validator             = require('express-validator');
const bodyParser            = require('body-parser');
const mongoose              = require('mongoose');
const autoIncrement         = require('mongoose-auto-increment');
const session               = require('express-session');
const passport              = require('passport');
const app                   = express();
const server                = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

// INITIALIZE MONGOOSE
mongoose.connect(process.env.MONGO_URL).then((res) => {
    console.log("Mongoose connection initiated..")
}).catch((err) => {
    console.log(err)
});

// INITIALIZE AUTOINCREMENT
autoIncrement.initialize(mongoose.connection);

// DECLARE ROUTES
const userRoutes            = require('./routes/user');

// INITIALIZE ROUTES
app.use(process.env.API_INITIALS + "/user", userRoutes)

// TEST ROUTE
app.get('/test', () => {
    console.log(`Test successful`);
})

// ERROR HANDLING
app.use((err,req,res,next) => {
    console.log('here')
    console.log(err)
});

// INITIALIZE SERVER
server.listen(port, () => {
    console.log(`Server started at port ${port}`)
})