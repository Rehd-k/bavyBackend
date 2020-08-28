const mongoose = require('mongoose');
const Schema =  mongoose.Schema;



const reviewsSchema = new mongoose.Schema({
  author : {
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
    'default': Date.now
  }
});



const newsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
    author: {
      type: String,
      required: true
    },
    title : String,
    subtitle: String,
    media: {
        url: String,
        public_id: String
        
    },
    newsText: {
      type: String,
      required: true
    },
    createdOn: {
      type: Date,
      default: Date.now
    },
    related : [{
      productId: String,
      productImage: String,
      productIdName: String
    }],

    reviews : [ reviewsSchema ],

  });

  
  

  module.exports = mongoose.model('news', newsSchema);