const mongoose = require('mongoose');
const news = mongoose.model('news');
const seller = mongoose.model('seller');

// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,
//   api_key:process.env.CLOUDINARY_API_KEY,
//   api_secret:process.env.CLOUDINARY_SECRET
// })

  
const getAuthor = (req, res, callback) => {
  if(req.payload && req.payload.email){
    seller
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
        callback(req, res, user.companyName );
      });
  }else {
    return res
      .status(404)
      .json({"message" : "This User not found"})
  }
};



const getSellersNews = (req, res, next) => {
  news.find()
              .exec((err, iterms) => {
                if(err){
                  res
                    .status(404)
                    .json(err)
                }else {
                  res
                    .status(200)
                    .json(iterms)
                }
              })
}

const newsiterms = (req, res ,next ) => {
  getAuthor(req, res, (req, res, userName) => {
    // req.body.media = [];
    // for(const file of req.files){
    //   let media = await cloudinary.uploader.upload(file.path);
    //   req.body.media.push({
    //     url: media.secure_url,
    //     public_id: media.public_id
    //   });
    // }
        news.create({ 
            _id : new mongoose.Types.ObjectId(),
            author : userName,
            title : req.body.title,
            subtitle : req.body.subtitle,
            newsText: req.body.newsText,
            relatedSKU :req.body.relatedSKU.split(","),
            media: req.body.media
          }, (err, iterm) => {
            if (err) {
              res 
                .status(400)
                .json(err);
            }else {
              res 
                .status(201)
                .json(iterm)
            }
          });
        });
    };

 
    const newsReadOne = (req, res) => {
      if (req.params && req.params.newsid) {
        news
          .findById(req.params.newsid)
          .exec((err, iterm) => {
            if (!iterm) {
              res
                .status(404)
                .json({
                  'message' : "newsid not found"
                });
                return;
            } else if (err) {
              res
                .status(404)
                .json(err);
                return;
            }
            res
              .status(200)
              .json(iterm)
          });
      } else {
        res
          .status(404)
          .json({
            "message" : "No newsid in request"
          })
      }
    }

    const newsUpdateOne = (req, res, next) => {
      
      if(!req.params.newsid){
        res
          .status(404)
          .json({
            "message" : "Not found, newsid is requried"
          });
          return;
      }
      getAuthor(req, res, (req, res, userName) => {
      news
        .findById(req.params.newsid)
        .select('-reviews')
        .exec((err, iterm) => {
          if(!iterm){
            res
              .status(404)
              .json({
                "message": "newsid not found"
              });
              return;
          }else if (err){
            res
              .status(404)
              .json(err);
              return;
          }
            iterm.author = userName,
            iterm.title = req.body.title,
            iterm.subtitle = req.body.subtitle,
            iterm.newsText= req.body.newsText,
            iterm.relatedSKU =req.body.relatedSKU.split(","),
            iterm.media= req.body.media;
            iterm.save((err, iterm) => {
              if(err){
                res
                  .status(404)
                  .json(err)
              } else {
                res
                  .status(200)
                  .json(iterm)
              }
            });
        });
      });
    };

    const newsDeleteOne = (req, res, next)=> {
      const newsid = req.params.newsid;
      if (newsid) {
        news
          .findByIdAndRemove(newsid)
          .exec((err, iterm) => {
            if(err){
              res
                .status(404)
                .json(err);
                return;
            }
            res
              .status(201)
              .json(null)
          });

      }else {
        res
          .status(404)
          .json({
           "message" : "No newsid" 
          })
      }
    }

    module.exports = {
        getSellersNews,
        newsiterms,
        newsReadOne,
        newsUpdateOne,
        newsDeleteOne

    }