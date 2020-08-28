const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
}); 
const ctrlAuth = require('../controller/authentication');
const ctrlProfile = require('../controller/profile')



router
    .route('/register')
    .post (ctrlAuth.register);
router
    .route('/login')
    .post(ctrlAuth.login);
router
    .route('/update/:userid')
    .put(auth,ctrlAuth.updateinfo)
    // .delete(auth,ctrlAuth.deleteUser);

router 
    .route('/profile')
    .get(auth,ctrlProfile.getProfile);


router 
    .route('/profile/userinfo')
    .get(auth,ctrlProfile.getUserInfo);


router
    .route('/profile/order')
    .get(auth,ctrlProfile.getOrders);

module.exports = router;
