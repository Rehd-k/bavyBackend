const mongoose = require('mongoose');
const compin = mongoose.model('companyInfo');
const User = mongoose.model('User')

const getAuthor = (req, res, callback ) => { 
  if(req.payload && req.payload.email){
    User
      .findOne({email : req.payload.email })
      .exec((err, user) => {
        if(!user) {
          return res
            .status(404)

            .json({"message" : "User not found"})
        }else if (err) {
          console.log(err);
          return res
            .status(404)
            .json(err)
        }
        callback(req, res, user.firstName );
      });
  }else {
    return res
      .status(404)
      .json({"message" : "User not found"})
  }
};

const reviewsCreate =(req, res) => {
        getAuthor(req, res, (req, res, userName)=>{
          const companyInfoid = req.params.companyinfoid;
          if(companyInfoid) {
              compin
                  .findById(companyInfoid)
                  .select('reviews')
                  .exec((err, companyinfo) => {
                      if(err) {
                          res
                              .status(400)
                              .json(err);
                      }else {
                          _doAddReview(req, res, companyinfo, userName );
                      }
                  });
              }else {
                  res
                      .status(404)
                      .json({ 
                          'message' : 'Not found, companyinfoid required'
                      });
              }
            });
          };
   
const reviewsReadOne = function (req, res) {
    if (req.params && req.params.companyinfoid && req.params.reviewid) {
      compin
        .findById(req.params.companyinfoid)
        .exec((err, companyinfo) => {
          if (!companyinfo) {
            res	
              .status(404) 
              .json({	
                "message": "companyinfoid not found"
              });	 
            return;
          } else if (err) {
            res	
              .status(404) 
              .json(err); 
            return; 	
          }
          if (companyinfo.reviews && companyinfo.reviews.length > 0) {
            const review = companyinfo.reviews.id(req.params.reviewid);
            if (!review) {
              res
                .status(404)
                .json({
                  "message": "reviewid not found"
              });
            } else {
              response = {
                companyinfo : {
                  name : companyinfo.name,
                  id : req.params.companyinfoid
                },
                review : review
              };
              res
                .status(200)
                .json(response);
            }
          } else {
            res
              .status(404)
              .json({
                "message": "No reviews found"
            });
          } 
        });
    } else {		
      res		
        .status(404) 	
        .json({	
          "message": "Not found, companyinfoid and reviewid are both required"
        });		
    }
  };
  
  const reviewsUpdateOne = function (req, res) {
    getAuthor(req, res, (req, res, userName)=>{
    if (!req.params.companyinfoid || !req.params.reviewid) {
      res
        .status(404)
        .json({
          "message": "Not found, companyinfoid and reviewid are both required"
        });
      return;
    }
    compin
      .findById(req.params.companyinfoid)
      .select('reviews')
      .exec((err, companyinfo) => {
        if (!companyinfo) {
          res
            .status(404)
            .json({
              "message": "companyinfoid not found"
            });
          return;
        } else if (err) {
          res
            .status(400)
            .json(err);
          return;
        }
        if (companyinfo.reviews && companyinfo.reviews.length > 0) {
          let thisReview = companyinfo.reviews.id(req.params.reviewid);
          if (!thisReview) {
            res
              .status(404)
              .json({
                "message": "reviewid not found"
              });
          } else {
            thisReview.author = userName;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            companyinfo.save((err, companyinfo) => {
              if (err) {
                res
                  .status(404)
                  .json(err);
              } else {
                _updateAverageRating(companyinfo._id);
                res
                  .status(200)
                  .json(thisReview);
              }
            });
          }
        } else {
          res
            .status(404)
            json({
              "message": "No review to update"
            });
        }
      }
    );
    });
  
  };

  const reviewsDeleteOne = function (req, res) {
    if (!req.params.companyinfoid || !req.params.reviewid) {
      res
        .status(404)
        .json({
          "message": "Not found, companyinfoid and reviewid are both required"
        });
      return;
    }
    compin
      .findById(req.params.companyinfoid)
      .select('reviews')
      .exec((err, companyinfo) => {
        if (!companyinfo) {
          res
            .status(404)
            .json({
              "message": "companyinfoid not found"
            });
          return;
        } else if (err) {
          res
            .status(400)
            .json(err);
          return;
        }
        if (companyinfo.reviews && companyinfo.reviews.length > 0) {
          if (!companyinfo.reviews.id(req.params.reviewid)) {
            res
              .status(404)
              .json({
                "message": "reviewid not found"
              });
          } else {
            companyinfo.reviews.id(req.params.reviewid).remove();
            companyinfo.save((err) => {
              if (err) {
                res
                  .status(404)
                  .json(err);
              } else {
                _updateAverageRating(companyinfo._id);
                res
                  .status(204)
                  .json(null);
              }
            });
          }
        } else {
          res
            .status(404)
            .json({
              "message": "No review to delete"
            });
        }
      }
    );
  };


// PRIVATE HELPER METHODS

const _doAddReview = function(req, res, companyinfo, author) {
    if (!companyinfo) {
      res
        .status(404)
        .json({
          "message": "companyinfoid not found"
        });
    } else {
      const {rating , reviewText} = req.body;
      companyinfo.reviews.push({
        author,
        rating,
        reviewText
      }); 
      companyinfo.save((err, companyinfo) => {
        if (err) {
          console.log(err);
          res
            .status(400)
            .json(err);
        } else {
          _updateAverageRating(companyinfo._id);
          let thisReview = companyinfo.reviews[companyinfo.reviews.length - 1];
           res
             .status(201)
             .json(thisReview);
        }
      });
    }
  };
  
  const _updateAverageRating = function(companyinfoid) {
    compin
      .findById(companyinfoid)
      .select('rating reviews')
      .exec((err, companyinfo) => {
        if (!err) {
          _doSetAverageRating(companyinfo); 
        }
      });
  };
  
  const _doSetAverageRating = function(companyinfo) {
    if (companyinfo.reviews && companyinfo.reviews.length > 0) {
      const reviewCount = companyinfo.reviews.length;
      let ratingTotal = 0;
      for (let i = 0; i < reviewCount; i++) {
        ratingTotal = ratingTotal + companyinfo.reviews[i].rating;
      }
      let ratingAverage = parseInt(ratingTotal / reviewCount, 10);
      companyinfo.rating = ratingAverage;
      companyinfo.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Average rating updated to", ratingAverage);
        }
      });
    }
  };
  
  
  module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
  };