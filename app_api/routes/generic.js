const express = require("express");
const router = express.Router();
const ctrlOrder = require('../controller/order')
const ctrlGeneric = require("../controller/genric");
const jwt = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
});


//save products routes
router
  .route("/generic/save")
  .post(auth, ctrlGeneric.saved)
  .get(auth, ctrlGeneric.getSaved);
router
  .route("/generic/saved/:itemId")
  .delete(auth, ctrlGeneric.unsave);


  // Save advert routes
router
  .route("/generic/advert")
  .get(ctrlGeneric.getAdvert)


  // Follow seller routes
router
  .route("/generic/follow")
  .post(auth, ctrlGeneric.toFollow)
  .get(auth, ctrlGeneric.isFollowed);

router
  .route('/generic/follow/:savedId/:sellerId')
  .delete(auth, ctrlGeneric.unFollow)



  //order routers 
router
  .route('/order')
  .post(auth, ctrlOrder.saveOrder)


  router
    .route('/handle_redirect')
    .get(ctrlGeneric.Logsomthing)
    .post(ctrlGeneric.getpay);


  
module.exports = router;
