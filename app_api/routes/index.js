const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
const ctrlindex = require('../controller/index');
const ctrlnews = require('../controller/news');
const ctrlProdReviews = require('../controller/productReviews');
const ctrlcompinReviews = require('../controller/companyInfoReviews');
const ctrlnewsReviews = require('../controller/newsReviews');


 

/* GET home page products. */
router
  .route('/')
  .get(ctrlindex.allIterms);

//search bar 
router 
  .route('/search/:searchtext/:skip') 
  .get(ctrlindex.searchBar)

router
  .route('/findone/:index_id')
  .get(ctrlindex.allItermsFindOne);

//product review routes

router
  .route('/findone/:productid/reviews') 
  .get(ctrlProdReviews.Getreviews)
  .post(auth,ctrlProdReviews.reviewsCreate);

router
  .route('/findone/:productid/reviews/:reviewid')
  .get(ctrlProdReviews.reviewsReadOne)
  .put(ctrlProdReviews.reviewsUpdateOne)
  .delete(ctrlProdReviews.reviewsDeleteOne);

// company show routes
router
  .route('/sellers') 
  .get(ctrlindex.getSellers);
//search bar 
router 
  .route('/sellers/search/:filterText/:searchtext')
  .get(ctrlindex.sellerSearchBar)
//get one seller

router
  .route('/sellers/filter/:filterText')
  .get(ctrlindex.filterSellers)
router
  .route('/sellers/seller/:sellerid')
  .get(ctrlindex.getOneSeller);

//companyinfo review routes
router
  .route('/sellers/seller/:companyinfoid/reviews')
  .post(auth,ctrlcompinReviews.reviewsCreate);

router
  .route('/sellers/seller/:companyinfoid/reviews/:reviewid')
  .get(ctrlcompinReviews.reviewsReadOne)
  .put(auth,ctrlcompinReviews.reviewsUpdateOne)
  .delete(auth,ctrlcompinReviews.reviewsDeleteOne);

//Get about page
  router
    .route('/sellers/about', ctrlindex.aboutpage)


//get sellers iterms
router
  .route('/sellers/iterms/:producers')
  .get(ctrlindex.getSellerIterms);


// company news routes
router
  .route('/sellers/news')
  .get(ctrlnews.getSellersNews);

router
  .route('/sellers/news/:newsid')
  .get(ctrlnews.newsReadOne);


//companynews review routes
router
  .route('/sellers/news/:newsid/reviews')
  .post(auth,ctrlnewsReviews.reviewsCreate);

router
  .route('/sellers/news/:newsid/reviews/:reviewid')
  .get(ctrlnewsReviews.reviewsReadOne)
  .put(auth,ctrlnewsReviews.reviewsUpdateOne)
  .delete(auth,ctrlnewsReviews.reviewsDeleteOne);

module.exports = router;
