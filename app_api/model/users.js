const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;




const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: "Please include your first name",
  },
  lastName: {
    type: String,
    required: "Please include your last Name",
  },
  Gender: {
    type: String,
    required: "Your Gender is missing",
  },
  Dob: Date,
  phoneNumber: {
    required: "Your phone number cannot be empty",
    type: Number,
    unique: "An account have already been registered with this number",
  },
  Address: String,
  email: {
    type: String,
    unique: "An account have already been registered with this email",
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    required: "Your email cannot be empty",
  },
  hash: String,
  salt: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
  Newsletter: {
    type: Boolean,
    default: false,
  },
  Notification: {
    type: Boolean,
    default: false,
  },
  Orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "orders",
    },
  ],
  Reviews: [ 
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  savedIterms : [{ 
    itemId : String,
    itemImage : String,
    itemName : String,
    ItemMaker : String,
    itemPrice: Number,
    Subtitle: String,
    color: String,
    size: String
  }],

  following: [{
    SellerName: String,
    SellerLogo: [String]
  }],
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      exp: parseInt(expiry.getTime() / 1000, 10),
    },
    process.env.JWT_SECRET
  );
};
module.exports = mongoose.model("User", userSchema);
