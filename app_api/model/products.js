const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
  reviewTitle: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  }
});



const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Title: String,
  Subtitle: String,
  Description: [{
    DescriptionText : String,
    Features: [String],
    Specification: [String]
  }],
  MarketPrice: String,
  Price: String,
  Sizes: [String],
  Color: [String],
  For: String,
  SKU: String,
  Category: String,
  Weight: [String],
  Lenght: String,
  mainMaterial: String,
  sizeChat: [{
    url: String,
    public_id: String
  }],
  stockLevel: {
    type: String,
    'deafault': 'Out of stock'
  },
  Images: [{
    url: String,
    public_id: String,
  }],
  reviews: [reviewSchema],
  Producers: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    'deafault': Date.now
  },
  Tags: [String],
  amount: {
    type: Number,
    default: 1
  }
})

productSchema.plugin(random)

module.exports = mongoose.model('product', productSchema)
