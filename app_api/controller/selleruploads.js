const mongoose = require("mongoose");
const productsModel = mongoose.model("product");
const companyInfo = mongoose.model("companyInfo");
const Seller = mongoose.model("seller");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const getAuthor = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    Seller.findOne({ email: req.payload.email }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        console.log(err);
        return res.status(404).json(err);
      }
      callback(req, res, user.companyName);
    });
  } else {
    return res.status(404).json({ message: "This User not found" });
  }
};

const goods = async (req, res, next) => {
  req.body.images = [];

  req.body.description = {
    DescriptionText : req.body.DescriptionText,
    Features: req.body.Features.split(";"),
    Specification: req.body.Specification.split(";"),
  }


  // for (let file of req.files) {
  //   let image = await cloudinary.uploader.upload(file.path);
  //   req.body.images.push({
  //     url: image.secure_url,
  //     public_id: image.public_id,
  //   });
  // }
  getAuthor(req, res, (req, res, userName) => {
    productsModel.create(
      {
        _id: new mongoose.Types.ObjectId(),
        Title: req.body.title,
        Subtitle: req.body.subtitle,
        Description: req.body.description,
        Price: req.body.price,
        MarketPrice: req.body.MarketPrice,
        Sizes: req.body.sizes.split(";"),
        Color: req.body.color.split(";"),
        For: req.body.for,
        SKU: req.body.SKU,
        Category: req.body.category,
        Weight: req.body.Weight,
        Lenght: req.body.lenght,
        mainMaterial: req.body.mainMaterial,
        sizeChat: req.body.sizeChat,
        stockLevel: req.body.stockLevel,
        Images: req.body.images,
        Tags: req.body.tags.split(";"),
        Producers: userName,
        amount: req.body.amount,
      },
      (err, iterm) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(iterm);
        }
      }
    );
  });
};

const companyinfo = async (req, res) => {
  req.body.address = []


  

  req.body.address = {
    location : req.body.location,
    state: req.body.state
  }
  getAuthor(req, res, (req, res, userName) => {
    companyInfo.create(
      {
        _id: new mongoose.Types.ObjectId(),
        companyName: userName,
        Address: req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        companyLogo: req.body.companyLogo,
        About: req.body.about,
        HeaderImage: req.body.headerimage, 
        Address: req.body.address,
        Email: req.body.email,
        Website: req.body.Website,
        Types: req.body.types.split(";")
      },
      (err, iterm) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(iterm);
        }
      }
    );
  });
};

const sellerUpdateOne = (req, res) => {
  getAuthor(req, res, (req, res, userName) => {
    companyInfo.findById(req.params.sellerid).exec((err, iterm) => {
      if (!iterm) {
        res.status(404).json({
          message: "sellerid not found",
        });
        return;
      }
      (iterm.companyName = userName),
        (iterm.firstName = req.body.firstName),
        (iterm.lastName = req.body.lastName),
        (iterm.About = req.body.about),
        (iterm.HeaderImage = req.body.headerimage);
      (iterm.companyLogo = req.body.companylogo),
        (iterm.Address = req.body.address),
        (iterm.HeaderImage = req.body.headerimage);
      iterm.save((err, iterm) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(iterm);
        }
      });
    });
  });
};

const sellerDeleteOne = (req, res) => {
  const sellerid = req.params.sellerid;
  if (sellerid) {
    companyInfo.findByIdAndRemove(req.params.sellerid).exec((err) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(201).json(null);
    });
  } else {
    res.status(404).json({
      message: "No newsid",
    });
  }
};


const productUpdateOne = (req, res, next) => {
  productsModel.findById(req.params.productid).exec((err, iterm) => {
    if (!iterm) {
      res.status(404).json({
        message: "productid not found",
      });
      return;
    }
    (iterm.Title = req.body.title),
      (iterm.Subtitle = req.body.subtitle),
      (iterm.Category = req.body.category),
      (iterm.For = req.body.for);
    (iterm.Description = req.body.description),
      (iterm.Price = req.body.price),
      (iterm.Sizes = req.body.sizes.split(",")),
      (iterm.Color = req.body.color.split(",")),
      (iterm.For = req.body.for),
      (iterm.SKU = req.body.SKU),
      (iterm.Category = req.body.category),
      (iterm.Weight = req.body.Weight),
      (iterm.Lenght = req.body.lenght),
      (iterm.mainMaterial = req.body.mainMaterial),
      (iterm.sizeChat = req.body.sizeChat),
      (iterm.stockLevel = req.body.stockLevel),
      (iterm.Images = req.body.Images),
      (iterm.Tags = req.body.tags.split(",")),
      iterm.save((err, iterm) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(iterm);
        }
      });
  });
};

const productDeleteOne = (req, res) => {
  const productid = req.params.productid;
  if (productid) {
    productsModel.findByIdAndRemove(req.params.productid).exec((err) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(201).json(null);
    });
  } else {
    res.status(404).json({
      message: "No newsid",
    });
  }
};
module.exports = {
  goods,
  productUpdateOne,
  productDeleteOne,
  companyinfo,
  sellerUpdateOne,
  sellerDeleteOne,
};
