const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart : Object,
    Address : {
        type : String,
        required: true
    },
    PaymentId: {
        type : String,
        required : true,
        deafult: 'payment on delivery'
    },
    orderNumber : {
        type: String,
        required: true,

    },
    name: {
        type : String,
        required : true
    },
    status : {
        type : String,
        'deafult' : 'pending'
        //failed, delivered, cancled, refunded, pending, confired
    }
});

module.exports = mongoose.model('order', orderSchema); 

