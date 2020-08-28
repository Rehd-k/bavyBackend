require('dotenv').config();
const  express = require('express');
const  path = require('path');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');
const  passport = require('passport');
require('./app_api/model/db');
require('./app_api/config/passport');



 const  apiRouter = require('./app_api/routes/index');
 const  usersRouter = require('./app_api/routes/users');
 const  sellerAuth = require('./app_api/routes/sellerAuth');
 const  selleruploads = require('./app_api/routes/selleruploads');
 const  fashionRouter = require('./app_api/routes/fashion');
 const  beaultyRouter = require('./app_api/routes/beaulty');
 const  materialRouter = require('./app_api/routes/materials');
 const  genricRouter = require('./app_api/routes/generic')
 
const  app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*" );
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization ');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
});

// app.use('/api/admin', adminRouter )
app.use('/api', apiRouter);
app.use('/api/user', usersRouter);
app.use('/api/seller', sellerAuth);
app.use('/api/seller', selleruploads);
app.use('/api', fashionRouter);
app.use('/api', beaultyRouter);
app.use('/api', materialRouter);
app.use('/api', materialRouter);
app.use('/api', genricRouter)


//error handlers
//catch unauthorized errors
app.use((err, req, res , next ) => {
    if (err.name === 'UnauthorizedError') {
        res
            .status(401)
            .json({
                "message" : err.name + " : " + err.message                
            });
    }
});

module.exports = app;
