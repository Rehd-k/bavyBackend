const mongoose = require("mongoose");
const productsModel = mongoose.model("product");

const beaultyIterms = (req, res, next) => {
  productsModel.findRandom(
    { Category: "beaulty" },
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
const beaultyItermsReadOne = (req, res, next) => {
  if (req.params && req.params.productid) {
    productsModel.findById(req.params.productid).exec((err, iterm) => {
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
const hairIterms = (req, res, next) => {
  productsModel.findRandom({ For: "haircare" }, {}, { limit: 10 }, function (
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

const haircareReadOne = (req, res, next) => {
  if (req.params && req.params.haircareid) {
    productsModel.findById(req.params.haircareid).exec((err, iterm) => {
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
const hairExtensions = (req, res, next) => {
  productsModel.findRandom(
    { Title: "hair Extensions" },
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
const hairExtensionsReadOne = function (req, res) {
  if (req.params && req.params.productid) {
    productsModel.findById(req.params.productid).exec((err, iterm) => {
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

//hair and scalp care get all
const hairAndScalpCare = (req, res, next) => {
  productsModel.findRandom(
    { Title: "Hair And Scalp Care" },
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
//hair and scalp care get one
const hairAndScalpCareReadOne = function (req, res) {
  if (req.params && req.params.productid) {
    productsModel.findById(req.params.productid).exec((err, iterm) => {
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

//Get all hair loss products
const hairLossProducts = (req, res, next) => {
  productsModel.findRandom(
    { Title: "hair Loss Products" },
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
//hair loss products read one
const hairLossProductsReadOne = function (req, res) {
  if (req.params && req.params.productid) {
    productsModel.findById(req.params.productid).exec((err, iterm) => {
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

const fragranceIterms = (req, res, next) => {
  productsModel.findRandom({ For: "fragrance" }, {}, { limit: 10 }, function (
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

const fragranceItermsFindOne = function (req, res) {
  if (req.params && req.params.fragranceid) {
    productsModel.findById(req.params.fragranceid).exec((err, iterm) => {
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

//Get all wemens iterms
const women = (req, res, next) => {
  productsModel.findRandom({ Title: "women" }, {}, { limit: 10 }, function (
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
//Get just one women iterm
const womenReadOne = function (req, res) {
  if (req.params && req.params.productid) {
    productsModel.findById(req.params.productid).exec((err, iterm) => {
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

//Get all men iterms
const men = (req, res, next) => {
  productsModel.findRandom({ Title: "men" }, {}, { limit: 10 }, function (
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

//Get one man iterm
const menReadOne = function (req, res) {
  if (req.params && req.params.productid) {
    productsModel.findById(req.params.productid).exec((err, iterm) => {
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

//Get all unisex iterms
const unisex = (req, res, next) => {
  productsModel.findRandom({ Title: "unisex" }, {}, { limit: 10 }, function (
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

//Get one unisex iterm
const unisexReadOne = function (req, res) {
  if (req.params && req.params.productid) {
    productsModel.findById(req.params.productid).exec((err, iterm) => {
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

const categoryItems = (req, res) => {
  catitems = req.params.categoryName;
  productsModel.find({ Category: catitems }).exec((err, iterm) => {
    if (!iterm) {
      res.status(404).json({
        message: "category not found",
      });
      return;
    } else if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(iterm);
  });
};

const titleItems = (req, res) => {
  tititems = req.params.titleName;
  productsModel.find({ Title: tititems }).exec((err, iterm) => {
    if (!iterm) {
      res.status(404).json({
        message: "category not found",
      });
      return;
    } else if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(iterm);
  });
};

const forItems = (req, res) => {
  fitems = req.params.forName;
  productsModel.find({ Title: fitems }).exec((err, iterm) => {
    if (!iterm) {
      res.status(404).json({
        message: "category not found",
      });
      return;
    } else if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(iterm);
  });
};

module.exports = {
  categoryItems,
  titleItems,
  forItems,



  beaultyIterms,
  beaultyItermsReadOne,

  hairIterms,
  haircareReadOne,
  hairExtensions,
  hairExtensionsReadOne,

  hairAndScalpCare,
  hairAndScalpCareReadOne,

  hairLossProducts,
  hairLossProductsReadOne,

  fragranceIterms,
  fragranceItermsFindOne,

  women,
  womenReadOne,

  men,
  menReadOne,

  unisex,
  unisexReadOne,
};
