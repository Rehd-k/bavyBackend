const mongoose = require('mongoose');
const newsModel = mongoose.model('news');
const user = mongoose.model('User');

const getAuthor = (req, res, callback) => {
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
        callback(req, res, user.firstName);
      });
  } else {
    return res
      .status(404)
      .json({ "message": "This User not found" })
  }
};



const reviewsCreate = (req, res) => {
  getAuthor(req, res, (req, res, userName) => {
    const newsid = req.params.newsid;
    if (newsid) {
      newsModel
        .findById(newsid)
        .select('reviews')
        .exec((err, news) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            _doAddReview(req, res, news, userName);
          }
        });
    } else {
      res
        .status(404)
        .json({
          'message': 'Not found, news required'
        });
    }
  });
};

const reviewsReadOne = function (req, res) {
  if (req.params && req.params.newsid && req.params.reviewid) {
    newsModel
      .findById(req.params.newsid)
      .exec((err, news) => {
        if (!news) {
          res
            .status(404)
            .json({
              "message": "newsid not found"
            });
          return;
        } else if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        if (news.reviews && news.reviews.length > 0) {
          const review = news.reviews.id(req.params.reviewid);
          if (!review) {
            res
              .status(404)
              .json({
                "message": "reviewid not found"
              });
          } else {
            response = {
              news: {
                name: news.name,
                id: req.params.newsid
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
        "message": "Not found, newsid and reviewid are both required"
      });
  }
};

const reviewsUpdateOne = function (req, res) {
  getAuthor(req, res, (req, res, userName) => {
    if (!req.params.newsid || !req.params.reviewid) {
      res
        .status(404)
        .json({
          "message": "Not found, newsid and reviewid are both required"
        });
      return;
    }
    newsModel
      .findById(req.params.newsid)
      .select('reviews')
      .exec((err, news) => {
        if (!news) {
          res
            .status(404)
            .json({
              "message": "newsid not found"
            });
          return;
        } else if (err) {
          res
            .status(400)
            .json(err);
          return;
        }
        if (news.reviews && news.reviews.length > 0) {
          let thisReview = news.reviews.id(req.params.reviewid);
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
            news.save((err, news) => {
              if (err) {
                res
                  .status(404)
                  .json(err);
              } else {
                _updateAverageRating(news._id);
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
  if (!req.params.newsid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, newsid and reviewid are both required"
      });
    return;
  }
  newsModel
    .findById(req.params.newsid)
    .select('reviews')
    .exec((err, news) => {
      if (!news) {
        res
          .status(404)
          .json({
            "message": "newsid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (news.reviews && news.reviews.length > 0) {
        if (!news.reviews.id(req.params.reviewid)) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          news.reviews.id(req.params.reviewid).remove();
          news.save((err) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(news._id);
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

const _doAddReview = function (req, res, news, author) {

  if (!news) {
    res
      .status(404)
      .json({
        "message": "newsid not found"
      });

  } else {

    const { rating, reviewText } = req.body;
    news.reviews.push({
      author,
      rating,
      reviewText
    });
    news.save((err, news) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json(err);
      } else {
        _updateAverageRating(news._id);
        let thisReview = news.reviews[news.reviews.length - 1];
        res
          .status(201)
          .json(thisReview);
      }
    });
  }
};

const _updateAverageRating = function (newsid) {
  newsModel
    .findById(newsid)
    .select('rating reviews')
    .exec((err, news) => {
      if (!err) {
        _doSetAverageRating(news);
      }
    });
};

const _doSetAverageRating = function (news) {
  if (news.reviews && news.reviews.length > 0) {
    const reviewCount = news.reviews.length;
    let ratingTotal = 0;
    for (let i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + news.reviews[i].rating;
    }
    let ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    news.rating = ratingAverage;
    news.save((err) => {
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