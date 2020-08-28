const express = require("express");
const router = express.Router();
const multer = require('multer')
const jwt = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
});
const uploadIterms = multer({ dest: "productsUploads/" });
const uploadNews = multer({ dest: "newsUploads/" });
const headerImages = multer({ dest: "headerImages/" });

const ctrluploads = require("../controller/selleruploads");
const ctrlNews = require("../controller/news");

//create products
router
  .route("/create/products")
  .post(auth, uploadIterms.array("images", 10), ctrluploads.goods);
router
  .route("/create/:productid")
  .put(auth, ctrluploads.productUpdateOne)
  .delete(auth, ctrluploads.productDeleteOne);

//upload  company information
router
  .route("/companyinfo")
  .post(auth, headerImages.single("companylogo"), ctrluploads.companyinfo);
router
  .route("/companyinfo/:sellerid")
  .put(auth, ctrluploads.sellerUpdateOne)
  .delete(auth, ctrluploads.sellerDeleteOne);

//news
router
  .route("/create/news")
  .post(auth, uploadNews.array("media", 10), ctrlNews.newsiterms);

router
  .route("/create/news/:newsid")
  .put(auth, ctrlNews.newsUpdateOne)
  .delete(auth, ctrlNews.newsDeleteOne);

module.exports = router;
