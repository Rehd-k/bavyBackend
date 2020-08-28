const mongoose = require('mongoose');

const userModel = mongoose.model('User');
const orderModel = mongoose.model('order');
const _ = require('lodash')

const getProfile = (req, res) => {
    //if no user exist 
    if(!req.payload.email){
        res
            .status(404)
            .json({
                "message" : "UnauthorizedError : Private profile"
            })
    }else {
    userModel
        .findOne({email : req.payload.email})
        .exec((err, user) => {
            if(err) {
                res
                    .status(404)
                    .json(err)
                    return;
            }else {
                res
                    .status(201)
                    // .json(_.pick(user, ['firstName', 'lastName']))
                    .json(user)

            }
        })
 }
}

const getOrders = (req, res, next) => {
    orderModel
        .find({ user : req.user})
        .exec((err, orders) => {
            if(err) {
                res
                    .status(404)
                    .json(err)
                    return;
            }else {
                res
                    .status(201)
                    .json(orders)
            }
        
        })
}

const getUserInfo = (req, res, next) => {
    userModel
        .find({})
        .exec((err, orders) => {
            if(err) {
                res
                    .status(404)
                    .json(err)
                    return;
            }else {
                res
                    .status(201)
                    .json(orders)
            }
        
        })
}

module.exports = {
    getProfile,
    getOrders,
    getUserInfo
}