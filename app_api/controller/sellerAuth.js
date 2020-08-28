const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('seller');

 
const register = (req, res, next) => {
    if ( !req.body.email || !req.body.password){
        return res 
        .status(400)
        .json({"message" : "All fields required"})
    }
    const user = new User();
    user._id = new mongoose.Types.ObjectId(),
    user.email = req.body.email;
    user.companyName = req.body.companyName;
    user.companyNumber = req.body.companyNumber;
    user.setPassword(req.body.password);
    user.save( (err) => {
        if (err) {
            res
                .status(404) 
                .json(err);
        } else {
            const token = user.generateJWT();
            res
                .status(200)
                .json({token})
        }
    });
}

const login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message" : "All fileds required"})
    }
    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) {
            return res 
                .status(404)
                .json(err)
        }
        if (user) {
            token = user.generateJWT();
            return res 
                .status(200)
                .json({token});
        } else {
            res
                .status(401)
                .json(info)
        }

        
    })(req, res);
};
module.exports = {
    register,
    login
};