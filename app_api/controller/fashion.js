const mongoose = require("mongoose");

const productsModel = mongoose.model("product");

//Get all fashion iterms
const fashionIterms = (req, res, next) => {
  productsModel.findRandom(
    { Category: "fashion" },
    {},
    { limit: 10 },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
};

//Get one fashion iterm
const fashionItermsReadOne = function (req, res) {
  if (req.params && req.params.fashion_id) {
    productsModel.findById(req.params.fashion_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get all mens iterms
const menIterms = (req, res, next) => {
  productsModel.findRandom({ For: "men" }, {}, { limit: 10 }, function (
    err,
    results
  ) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
};

//Get one mans Iterm
const menItermsReadOne = function (req, res) {
  if (req.params && req.params.mens_id) {
    productsModel.findById(req.params.mens_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get watches
const watches = (req, res, next) => {
  productsModel.findRandom({ Title: "watch" }, {}, { limit: 10 }, function (
    err,
    results
  ) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
};
//Get one watch
const watchesReadOne = function (req, res) {
  if (req.params && req.params.watch_id) {
    productsModel.findById(req.params.watch_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};
//Get all clothing
const clothing = (req, res, next) => {
  productsModel.findRandom({ Title: "clothing" }, {}, { limit: 10 }, function (
    err,
    results
  ) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
};
//Get one cloth
const clothingReadOne = function (req, res) {
  if (req.params && req.params.cloth_id) {
    productsModel.findById(req.params.cloth_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get all shoes
const shoes = (req, res, next) => {
  productsModel.findRandom({ Title: "shoe" }, {}, { limit: 10 }, function (
    err,
    results
  ) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
};
//Get one shoe
const shoesReadOne = function (req, res) {
  if (req.params && req.params.shoe_id) {
    productsModel.findById(req.params.shoe_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get all accessories
const accessories = (req, res, next) => {
  productsModel.findRandom({ Title: "accessory" }, {}, { limit: 10 }, function (
    err,
    results
  ) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
};
//Get one accessory
const accessoriesReadOne = function (req, res) {
  if (req.params && req.params.accessory_id) {
    productsModel.findById(req.params.accessory_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get all jewelry
const menjewelry = (req, res, next) => {
  productsModel.findRandom({ Title: "jewelry" }, {}, { limit: 10 }, function (
    err,
    results
  ) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
};
//Get one jewelry
const menjewelryReadOne = function (req, res) {
  if (req.params && req.params.menjewelry_id) {
    productsModel.findById(req.params.menjewelry_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get all women iterms
const womenIterms = (req, res, next) => {
  productsModel.findRandom({ For: "women" }, {}, { limit: 10 }, function (
    err,
    results
  ) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
};

//Get one woman iterm
const womenItermsReadOne = function (req, res) {
  if (req.params && req.params.womens_id) {
    productsModel.findById(req.params.womens_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get watches
const womenWatches = (req, res, next) => {
  productsModel.findRandom(
    { Title: "women watches" },
    {},
    { limit: 10 },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
};
//Get one watch
const womenWatchesReadOne = function (req, res) {
  if (req.params && req.params.watch_id) {
    productsModel.findById(req.params.watch_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};
//Get all clothing
const womenClothing = (req, res, next) => {
  productsModel.findRandom(
    { Title: "women clothing" },
    {},
    { limit: 10 },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
};
//Get one cloth
const womenClothingReadOne = function (req, res) {
  if (req.params && req.params.cloth_id) {
    productsModel.findById(req.params.cloth_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get all shoes
const womenShoes = (req, res, next) => {
  productsModel.findRandom(
    { Title: "women shoes" },
    {},
    { limit: 10 },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
};
//Get one shoe
const womenShoesReadOne = function (req, res) {
  if (req.params && req.params.shoe_id) {
    productsModel.findById(req.params.shoe_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get all accessories
const womenAccessories = (req, res, next) => {
  productsModel.findRandom(
    { Title: "women accessory" },
    {},
    { limit: 10 },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
};
//Get one accessory
const womenAccessoriesReadOne = function (req, res) {
  if (req.params && req.params.accessory_id) {
    productsModel.findById(req.params.accessory_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

//Get all jewelry
const womenJewelry = (req, res, next) => {
  productsModel.findRandom(
    { Title: "women jewelry" },
    {},
    { limit: 10 },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
};
//Get one jewelry
const womenJewelryReadOne = function (req, res) {
  if (req.params && req.params.jewelry_id) {
    productsModel.findById(req.params.jewelry_id).exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};
//Get all handbags and wallets
const handbagAndWallets = (req, res, next) => {
  productsModel.findRandom(
    { Title: "handbags and wallets" },
    {},
    { limit: 10 },
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
};
//Get one handbag or wallet
const handbagsAndWalletReadOne = function (req, res) {
  if (req.params && req.params.hansbagsAndWallets_id) {
    productsModel
      .findById(req.params.hansbagsAndWallets_id)
      .exec((err, iterm) => {
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
      message: "No itermid in request",
    });
  }
};

module.exports = {
  fashionIterms,
  fashionItermsReadOne,

  menIterms,
  menItermsReadOne,

  watches,
  watchesReadOne,

  clothing,
  clothingReadOne,

  shoes,
  shoesReadOne,

  accessories,
  accessoriesReadOne,

  menjewelry,
  menjewelryReadOne,

  //women iterms

  womenIterms,
  womenItermsReadOne,

  womenWatches,
  womenWatchesReadOne,

  womenClothing,
  womenClothingReadOne,

  womenShoes,
  womenShoesReadOne,

  womenAccessories,
  womenAccessoriesReadOne,

  womenJewelry,
  womenJewelryReadOne,

  handbagAndWallets,
  handbagsAndWalletReadOne,
};
