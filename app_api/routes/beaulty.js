const express = require ('express');
const router = express.Router();
const ctrlbeaulty = require('../controller/beaulty')

//Get all beaulty iterms 
router.get('/cat/:categoryName', ctrlbeaulty.categoryItems)
router.get('/title/:titleName', ctrlbeaulty.titleItems)
router.get('/for/:forName', ctrlbeaulty.forItems)


router.get('/beaulty', ctrlbeaulty.beaultyIterms);
router.get('/beaulty/findone/:productid', ctrlbeaulty.beaultyItermsReadOne);

//Get all beaulty/haircare iterms  
router.get('/beaulty/haircare', ctrlbeaulty.hairIterms);
router.get('/beaulty/haircare/findone/:haircareid', ctrlbeaulty.haircareReadOne)

//Get just beaulty/haircare/extensions only 
router.get('/beaulty/haircare/extensions', ctrlbeaulty.hairExtensions);
router.get('/beaulty/haircare/extensions/:productid', ctrlbeaulty.hairExtensionsReadOne);

//Get just beaulty/haircare/hair and scalp care only 
router.get('/beaulty/haircare/hairandsaclpcare', ctrlbeaulty.hairAndScalpCare);
router.get('/beaulty/haircare/hairandsaclpcare/:productid', ctrlbeaulty.hairAndScalpCareReadOne);


//Get just beaulty/haircare/hairlosspeoducts only 
router.get('/beaulty/haircare/hairLossProducts', ctrlbeaulty.hairLossProducts);
router.get('/beaulty/haircare/hairLossProducts/:productid', ctrlbeaulty.hairLossProductsReadOne);



//Get all beaulty/fragrance iterms 
router.get('/beaulty/fragrance', ctrlbeaulty.fragranceIterms);
router.get('/beaulty/fragrance/findone/:fragranceid', ctrlbeaulty.fragranceItermsFindOne)

//Get just beaulty/fragrance/wemen iterms only
router.get('/beaulty/fragrance/women', ctrlbeaulty.women);
router.get('/beaulty/fragrance/women/:productid', ctrlbeaulty.womenReadOne);

//Get just beaulty/fragrance/men iterms only
router.get('/beaulty/fragrance/men', ctrlbeaulty.men);
router.get('/beaulty/fragrance/men/:productid', ctrlbeaulty.menReadOne);

//Get just beaulty/fragrance/unisex iterms only
router.get('/beaulty/fragrance/unisex', ctrlbeaulty.unisex);
router.get('/beaulty/fragrance/unisex/:productid', ctrlbeaulty.unisexReadOne);

module.exports = router;