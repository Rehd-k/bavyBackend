const mongoose = require("mongoose");
const ProductsModel = mongoose.model("product");
const _ = require("lodash");
const companyInfoModel = mongoose.model("companyInfo");

//Get all iterms
const allIterms = (req, res, next) => {
  ProductsModel
    .find()
    .select(['Title', 'Subtitle', 'reviews.rating', 'MarketPrice', 'Price', 'Images'])
    .skip()
    .exec((err, iterm) => {
      if(err) {
        res
         .status(404)
         .json(err)
      }else {
        res
          .status(200)
          .json(iterm)
      }
    })
  
  // .findRandom({}, {}, { limit: 10 }, function (err, results) {
  //   if (err) {
  //     console.log(err); 
  //   }
  //   else{
  //     res
  //       .status(200)
  //       .json(results)
  //   }
  // });
};

//Get one iterm
const allItermsFindOne = (req, res, next) => {
  if (req.params && req.params.index_id) {
    ProductsModel.findById(req.params.index_id)
    .exec((err, iterm) => {
      if (!iterm) {
        res.status(404).json({
          message: "Product not found",
        });
        return;
      } else if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(200).json(iterm);
    });
  } else {
    res.status(404).json({
      message: "No iterm id in request",
    });
  }
};

//Get iterms searched for
const searchBar = (req, res, next) => {
  let skip = parseInt(req.params.skip);
  if (!req.params.searchtext) {
    res.status(400).json({ message: "please include a parameter" });
  } else {
    
    // console.log(skip)
    ProductsModel.find({ Title:req.params.searchtext})
    // .skip(skip)
    .exec((err, iterms) => {
      if (err) {
        res.status(404).json(err);
      } else {
        if (iterms === []) {
          res.json({ message: "no reasult found" });
        } else {
          res.status(200).json(iterms);
        }
      }
    });
  } 
};

//  GEt all sellers
const getSellers = (req, res, next) => {
  companyInfoModel
    
  .findRandom({}, {}, { limit: 10 }, function (err, results) {
    if (err) {
      console.log(err); 
    }
    else{
      res
        .status(200)
        .json(results)
    }
  });
};

// filter sellers 
const filterSellers = (req, res, next) => {
  companyInfoModel
    .find({type : req.params.filterText})
    .limit(10)
    .exec((err, iterms) => {
      if(err) {
        res
          .status(404)
          .json(err)
      }
      else {
        res
          .status(200)
          .json(iterms)
      }
    })

}

 

//Get one seller
const getOneSeller = (req, res, next) => {
  if (req.params && req.params.sellerid) {
    companyInfoModel.findById(req.params.sellerid).exec((err, iterm) => {
      if (!iterm) {
        res.status(404).json({
          message: "itermId not found",
        });
        return;
      } else if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(200).json(iterm);
    });
  } else {
    res.status(404).json({
      message: "No sellerid in request",
    });
  }
};

//Get seller iterms
const getSellerIterms = (req, res, next) => {
  if (!req.params.producers) {
    res.status(400).json({ message: "please include a parameter" });
  } else {
    ProductsModel.find({
      Producers: req.params.producers,
    }).exec((err, iterms) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(iterms);
      }
    });
  }
};

//Get about page stuffs
const aboutpage = (req, res, next) => {
  if (!req.params.producers) {
    res.status(400).json({ message: "please include a parameter" });
  } else {
    companyInfoModel.findById(req.params.sellerid).exec((err, iterms) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res
          .status(200)
          .json({
            iterms: _.pick(iterms, [
              "companyLogo",
              "companyName",
              "craetedOn",
              "aboutText",
              "reviews",
            ]),
          });
      }
    });
  }
};

const sellerSearchBar = (req, res, next) => {

  if (!req.params.searchtext) {
    res.status(400).json({ message: "please include a parameter" });
  } else {
    companyInfoModel
      .find({ companyName: req.params.searchtext,Tags: req.params.searchtext,Type:req.params.filterText})
      .exec((err, iterms) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(iterms);
        }
      });
  }
};
module.exports = {
  allIterms,
  allItermsFindOne,
  searchBar,

  getSellers,
  getOneSeller,
  getSellerIterms,
  sellerSearchBar,
  filterSellers,

  aboutpage,
};
