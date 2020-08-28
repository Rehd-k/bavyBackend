const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const random = require('mongoose-simple-random')



const reviewSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});
 


const companyInfoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdOn: {
    type: Date,
    default: Date.now
  },
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    isVerified : {
        type : Boolean,
        deafult : false
    },
    Orders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    companyLogo :[{
        url: String,
        public_id: String
    }],
    headerImage: [ {
        url: String,
        public_id: String
    }],
    Address : {
        location : String,
        state: String
    },
    Website: String,
    Newsletter : {
        type : Boolean,
        default : false
    }, 
    rating: Number,
    Email: {
      type: String,
    },
    reviews  : [reviewSchema],
    About : String,
    companyName: {
      type: String,
      required: true
    },
    Types : [String],
    follwers: [{
      name: String,
      email: String
    }]
  });

  
  companyInfoSchema.plugin(random)



  module.exports = mongoose.model('companyInfo', companyInfoSchema);
