const mongoose = require('mongoose');
const prod = mongoose.model('product');
const user = mongoose.model('User');

const getAuthor = (req, res, username) => {
  if (req.payload && req.payload.email) {
    user
      .findOne({ email: req.payload.email })
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({ "message": "User not found" })
        } else if (err) {
          console.log(err);
          return res
            .status(404)
            .json(err)
        }
        username(req, res, user.firstName);
      });
  } else {
    return res
      .status(404)
      .json({ "message": "This User not found" })
  }
};

const Getreviews = (req, res) => {
  const productid = req.params.productid;
  if (productid) {
    prod
      .findById(productid)
      .select('reviews')
      .limit(5)
      .exec((err, reviews) => {
        if (err) {
          res
            .status(404)
            .json(err);
        }
        else {
          res
            .status(200)
            .json(reviews)
        }
      })
  }
}

const reviewsCreate = (req, res) => {
  getAuthor(req, res, (req, res, userName) => {
    const productid = req.params.productid;

    if (productid) {
      prod
        .findById(productid)
        .select('reviews')
        .exec((err, product) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            _doAddReview(req, res, product, userName);
          }
        });
    } else {
      res
        .status(404)
        .json({
          'message': 'Not found, product required'
        });
    }
  })


};

const reviewsReadOne = function (req, res) {
  if (req.params && req.params.productid && req.params.reviewid) {
    prod
      .findById(req.params.productid)
      .exec((err, product) => {
        if (!product) {
          res
            .status(404)
            .json({
              "message": "productid not found"
            });
          return;
        } else if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        if (product.reviews && product.reviews.length > 0) {
          const review = product.reviews.id(req.params.reviewid);
          if (!review) {
            res
              .status(404)
              .json({
                "message": "reviewid not found"
              });
          } else {
            response = {
              product: {
                name: product.name,
                id: req.params.productid
              },
              review: review
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
        "message": "Not found, productid and reviewid are both required"
      });
  }
};

const reviewsUpdateOne = function (req, res) {
  if (!req.params.productid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, productid and reviewid are both required"
      });
    return;
  }
  prod
    .findById(req.params.productid)
    .select('reviews')
    .exec((err, product) => {
      if (!product) {
        res
          .status(404)
          .json({
            "message": "productid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (product.reviews && product.reviews.length > 0) {
        let thisReview = product.reviews.id(req.params.reviewid);
        if (!thisReview) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          thisReview.author = req.payload.email;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          product.save((err, product) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(product._id);
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
};

const reviewsDeleteOne = function (req, res) {
  if (!req.params.productid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, productid and reviewid are both required"
      });
    return;
  }
  prod
    .findById(req.params.productid)
    .select('reviews')
    .exec((err, product) => {
      if (!product) {
        res
          .status(404)
          .json({
            "message": "productid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (product.reviews && product.reviews.length > 0) {
        if (!product.reviews.id(req.params.reviewid)) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          product.reviews.id(req.params.reviewid).remove();
          product.save((err) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(product._id);
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

const _doAddReview = function (req, res, product, author) {
  if (!product) {
    res
      .status(404)
      .json({
        "message": "productid not found"
      });
  } else {
    const { rating, reviewText, reviewTitle } = req.body
    product.reviews.push({
      author,
      rating,
      reviewText,
      reviewTitle
    });
    product.save((err, product) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json(err);
      } else {
        _updateAverageRating(product._id);
        let thisReview = product.reviews[product.reviews.length - 1];
        res
          .status(201)
          .json(thisReview);
      }
    });
  }
};

const _updateAverageRating = function (productid) {
  prod
    .findById(productid)
    .select('rating reviews')
    .exec((err, product) => {
      if (!err) {
        _doSetAverageRating(product);
      }
    });
};

const _doSetAverageRating = function (product) {
  if (product.reviews && product.reviews.length > 0) {
    const reviewCount = product.reviews.length;
    let ratingTotal = 0;
    for (let i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + product.reviews[i].rating;
    }
    let ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    product.rating = ratingAverage;
    product.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};


module.exports = {
  Getreviews,
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};