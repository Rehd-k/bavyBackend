const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controller/sellerAuth');



router
    .route('/register')
    .post(ctrlAuth.register);
router
    .route('/login')
    .post( ctrlAuth.login);


module.exports = router;
