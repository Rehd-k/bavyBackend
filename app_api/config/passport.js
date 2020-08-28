const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const seller = mongoose.model('seller');

passport.use (new LocalStrategy({
    usernameField : 'email'
},
(username, password, done) => {
    //shearch db for user
    User.findOne({ email : username}, (err, user) => {
        if (err) {return done (err); }
        //if user not found 
        if (!user) {
            return done (null, false, {message : 'User not found'});
        }
        // if password is worng
        if (!user.validPassword(password)){
            return done (null, false, {message: 'Email or Password is incorrect'});
        }
        //if it reaches this end return a user 
        return done (null, user);
    })
}
));

// passport.use (new LocalStrategy({
//     usernameField : 'email'
// },
// (username, password, done) => {
//     //shearch db for user
//     seller.findOne( { email : username} , (err, user) => {
//         if (err) {return done (err); }
//         //if user not found 
//         if (!user) {
//             return done (null, false, {message : 'User not found '});
//         }
//         // if password is worng
//         if (!user.validPassword(password)){
//             return done (null, false, {message : 'invalid'});
//         }
//         //if it reaches this end return a user 
//         return done (null, user);
//     })
// }
// ));