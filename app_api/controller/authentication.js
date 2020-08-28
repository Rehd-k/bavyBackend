const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


const register = (req, res, next) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" })
     } else if (req.body.email) {
    //     User.find({ email: req.body.email })
    //         .exec((err, user) => {
    //             if (user) {
    //                 return res
    //                     .status(404)
    //                     .json({ 'message': "This email is already registered with another account" })
    //             }
    //         })
    // }
    
        const user = new User();
        user._id = new mongoose.Types.ObjectId(),
            user.firstName = req.body.firstName, 
            user.lastName = req.body.lastName,
            user.Gender = req.body.gender,
            user.phoneNumber = req.body.phoneNumber,
            user.email = req.body.email,
            user.Dob = req.body.Dob,
            user.Address = req.body.address,
            user.setPassword(req.body.password);
        user.save((err) => {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                const token = user.generateJWT();
                res
                    .status(200)
                    .json({ token })
            }
        });
    }


}

const updateinfo = (req, res) => {
    User.findById(req.params.userid).exec((err, user) => {
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        user.firstName = req.body.firstName,
            user.lastName = req.body.lastName,
            user.Gender = req.body.gender,
            user.phoneNumber = req.body.phoneNumber,
            user.email = req.body.email,
            user.Dob = req.body.Dob,
            user.Address = req.body.address,
            user.Newsletter = req.body.newsletter,
            user.Notification = req.body.notify
        user.save((err, user) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json(user);
            }
        });
    });
};

const login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fileds required" })
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
                .json({ token });
        } else {
            res
                .status(401)
                .json(info)
        }


    })(req, res);
};

module.exports = {
    register,
    login,
    updateinfo
};