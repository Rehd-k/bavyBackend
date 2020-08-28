const mongoose = require("mongoose");

const productsModel = mongoose.model("product");

//Get all material iterms
const materialIterms = (req, res, next) => {
  productsModel.findRandom(
    { Category: "material" },
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

//Get one material iterm
const materialItermsReadone = (req, res, next) => {
  if (req.params && req.params.material_id) {
    productsModel.findById(req.params.material_id).exec((err, iterm) => {
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

//Get all fabric iterm
const fabricIterms = (req, res, next) => {
  productsModel.findRandom({ For: "fabrics" }, {}, { limit: 10 }, function (
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

//Get one fabric iterm
const fabricItermsReadOne = (req, res, next) => {
  if (req.params && req.params.fabirc_id) {
    productsModel.findById(req.params.fabirc_id).exec((err, iterm) => {
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

//Get all leather iterms
const leatherIterms = (req, res, next) => {
  productsModel.findRandom({For: "leather"}, {}, { limit: 10 }, function (
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
//Get one leather iterm

const leatherItermsReadOne = (req, res, next) => {
  if (req.params && req.params.leather_id) {
    productsModel.findById(req.params.leather_id).exec((err, iterm) => {
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
  materialIterms,
  materialItermsReadone,

  fabricIterms,
  fabricItermsReadOne,

  leatherIterms,
  leatherItermsReadOne,
};
