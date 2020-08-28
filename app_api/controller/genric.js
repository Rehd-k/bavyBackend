const mongoose = require("mongoose");

const User = mongoose.model("User");

const Seller = mongoose.model("companyInfo");

const generic = mongoose.model("Generic")

const Pusher = require('pusher');

let pusher = new Pusher({
  app_id: "1010626",
  key: process.env.PushKey,
  secret: "15ae8cdea27c25be6200",
  cluster: "eu"
});


const toFollow = async (req, res, next) => {
  const user = { email: req.payload.email };
  const seller = { companyName: req.body.SellerName };
  if (user) {
    User
      .findOne(user)
      .select("following")
      .exec(async (err, details) => {
        if (err) {
          res
            .status(400)
            .json(err)
        }
        else {
          details.following.push({
            SellerName: req.body.SellerName,
            SellerLogo: req.body.SellerLogo
          });
          await details.save((err, details) => {
            if (err) {
              res
                .status(400)
                .json(err)
            } else {
              res
                .status(201)
                .json(details.following)
            }
          })
        }
      })

    if (seller) {
      Seller
        .findOne(seller)
        .select("follwers")
        .exec(async (err, details) => {
          if (err) {
            res
              .status(400)
              .json(err)
          }
          else {
            details.follwers.push({
              name: req.body.name,
              email: req.body.email
            });
            await details.save((err, details) => {
              if (err) {
                res
                  .status(400)
                  .json(err)
              } else {
                res
                  .status(201)
                  .json(details.following)
              }
            })
          }
        });
    } else {
      res
        .status(404)
        .json({
          message: "Creator Dose not exist"
        });
    }
    ;

  } else {
    res
      .status(404)
      .json({
        message: "Please login to follow"
      });
  }
}
const isFollowed = (req, res, next) => {
  const user = { email: req.payload.email };
  User
    .findOne(user)
    .select('following')
    .exec((err, details) => {
      if (err) {
        res
          .status(404)
          .json(err)
      } else {
        res
          .status(200)
          .json(details.following)
      }
    })
}
const unFollow = async (req, res) => {
  const user = { email: req.payload.email };
  const saved = { id: req.params.savedId };
  if (!user) {
    res.status(404).json({
      message: "please login!",
    });
    return;
  } else if (!saved) {
    res.status(404).json({
      message: "Please try again letter!",
    });
    return;
  }
  User
    .findOne(user)
    .select("following")
    .exec(async (err, details) => {
      if (!details) {
        res
          .status(404)
          .json({
            message: 'Already removed'
          })
      } else {
        await details.following.id(req.params.savedId).remove();
        await details.save((err, product) => {
          if (err) {
            res.status(404).json(err);
          }
        });
      }
    })
  Seller
    .findById(req.params.sellerId)
    .select("follwers")
    .exec(async (err, details) => {
      if (err) {
        res
          .status(404)
          .json(err)
      }
      else {
        const forRemove = () => {
          let followers
          for (const id of details.follwers) {
            followers = id.email == user.email
          }
          return followers;
        }
        const it = details.follwers.find(forRemove);
        await details.follwers.id(it._id).remove()
        await details.save((err, product) => {
          if (err) {
            res
              .status(404)
              .json(err);
          }
        })
      }
    })
};
// SAVE PRODUCTS FUNCTIONS

const saved = (req, res, next) => {
  const user = { email: req.payload.email };
  if (user) {
    User

      .findOne(user)
      .select("savedIterms")
      .exec((err, product) => {
        if (err) {
          res.status(400).json(err);
        } else {
          _save(req, res, product);
        }
      });
  } else {
    res.status(404).json({
      message: "Please login to save"
    });
  }
};
const getSaved = (req, res) => {
  const user = { email: req.payload.email };

  if (user) {
    User
      .findOne(user)
      .select("savedIterms")
      .exec((err, product) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(product.savedIterms);
        }
      });
  } else {
    res.status(404).json({
      message: "Please login to save"
    });
  }
};


const unsave = (req, res) => {
  const user = { email: req.payload.email };
  const saved = { id: req.body.itemId };
  if (!user || !saved) {
    res.status(404).json({
      message: "please login!",
    });
    return;
  }
  User
    .findOne(user)
    .select("savedIterms")
    .exec((err, product) => {
      if (!product) {
        res
          .status(404)
          .json({
            message: 'Already removed'
          })
      }
      if (err) {
        res.status(400).json(err);
      } else {
        _delete(req, res, product);
      }
    });
};



// HELPER FUNCTIONS

// SAVE PRODUCTS HELP
const _save = (req, res, product) => {
  if (!product) {
    res.status(404).json({
      message: "no product found "
    });
  } else {
    product.savedIterms.push({
      itemId: req.body._id,
      itemImage: req.body.Image,
      itemName: req.body.Title,
      itemPrice: req.body.Price,
      ItemMaker: req.body.Producer,
      Subtitle: req.body.Subtitle,
      color: req.body.color,
      size: req.body.size
    });
    product.save((err, product) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(product.savedIterms);
      }
    });
  }
};

// DELETE HELP
const _delete = (req, res, product) => {
  if (!req.params.itemId) {
    res
      .status(404)
      .json({ message: 'already removed' })
  }
  product.savedIterms.id(`${req.params.itemId}`).remove();
  product.save((err, product) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(product.savedIterms);
    }
  });
};




const getpay = (req, res) => {
  let response = req.query.response;
  response = JSON.parse(response)
  if (response.status && response.status == "failed") {
    // send error response via socket
    pusher.trigger('3dsecure-channel', 'error', {
      "message": response.status + ". " + response.vbvrespmessage
    });

  } else {
    response.chargeToken.embed_token
    // send success response and embed token
    pusher.trigger('3dsecure-channel', 'success', {
      "message": response.status,
      "token": response.chargeToken.embed_token
    });

  }
  res.json({ message: "Kindly Close This Window" });
};

const Logsomthing = (req, res) => {

  res.redirect(200, 'google.com')
}

const getAdvert = (req, res) => {
  generic
    .find()
    .limit(10)
    .skip()
    .select('advert')
    .exec((err, result) => {
      if (err) {
        res
          .status(404)
          .json(err)
      }
      else {
        res
          .status(200)
          .json(result)
      }
    })
}



module.exports = {
  saved,
  unsave,
  getSaved,


  toFollow,
  isFollowed,
  unFollow,

  getpay,
  Logsomthing,
  getAdvert
};
