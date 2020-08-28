const mongoose = require("mongoose");

const order = mongoose.model("order");

const saveOrder = (req, res, next) => {
  order.create({
    _id: new mongoose.Types.ObjectId(),
    user: req.payload,
    cart: req.body.cart,
    Address: req.body.address,
    PaymentId: req.body.PaymentId,
    name: req.body.name,
    orderNumber: req.body.orderNumber
  },
  (err, itrem) => {
    if (err) {
      res.status(404).json(err); 
    } else {
      res.status(200)
          .json(itrem);
    }
  })
};


 
          

module.exports = {
  saveOrder
};
