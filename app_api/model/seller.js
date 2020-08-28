const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


const sellerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    companyNumber : {
        type: Number,
        required: 'Phone number cannot be empty',
        unique: 'This number is already reghistered to an account'
    }, 
    email : {
        type : String,
        required: 'Email connot be empty',
        unique: "This email is already registered",
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    
    },
    createdOn : {
        type: Date,
        'deafault' : Date.now
    },
    hash : String,
    salt : String

});
sellerSchema.methods.setPassword =  function(password)  {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex')
};

sellerSchema.methods.validPassword = function(password)  {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
     return this.hash === hash;
};

sellerSchema.methods.generateJWT = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);


    return jwt.sign({
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        exp: parseInt(expiry.getTime() / 1000, 10)
    }, process.env.JWT_SECRET)
}

module.exports = mongoose.model('seller', sellerSchema)






