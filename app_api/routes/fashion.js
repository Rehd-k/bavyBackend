const express = require('express');
const router = express.Router();
const ctrlfashion = require('../controller/fashion');



/*
 * fashion/men
 */ 
router.get('/fashion', ctrlfashion.fashionIterms );
router.get('/fashion/findone/:fashion_id', ctrlfashion.fashionItermsReadOne);

 

router.get('/fashion/men', ctrlfashion.menIterms);
router.get('/fashion/men/findone/:mens_id', ctrlfashion.menItermsReadOne);


router.get('/fashion/men/watches', ctrlfashion.watches);
router.get('/fashion/men/watches/:watch_id', ctrlfashion.watchesReadOne);


router.get('/fashion/men/clothing', ctrlfashion.clothing);
router.get('/fashion/men/clothing/:cloth_id', ctrlfashion.clothingReadOne);


router.get('/fashion/men/shoes', ctrlfashion.shoes);
router.get('/fashion/men/shoes/:shoe_id', ctrlfashion.shoesReadOne);


router.get('/fashion/men/accessories', ctrlfashion.accessories);
router.get('/fashion/men/accessories/:accessory_id', ctrlfashion.accessoriesReadOne);


router.get('/fashion/men/jewelry', ctrlfashion.menjewelry);
router.get('/fashion/men/jewelry/:menjewelry_id', ctrlfashion.menjewelryReadOne);



/**
 * fashion/women
 */


router.get('/fashion/women', ctrlfashion.womenIterms);
router.get('/fashion/women/findone/:womens_id', ctrlfashion.womenItermsReadOne);


router.get('/fashion/women/watches', ctrlfashion.womenWatches);
router.get('/fashion/women/watches/:watch_id', ctrlfashion.womenWatchesReadOne);


router.get('/fashion/women/clothing', ctrlfashion.womenClothing);
router.get('/fashion/women/clothing/:cloth_id', ctrlfashion.womenClothingReadOne);


router.get('/fashion/women/shoes', ctrlfashion.womenShoes);
router.get('/fashion/women/shoes/:shoe_id', ctrlfashion.womenShoesReadOne);


router.get('/fashion/women/accessories', ctrlfashion.womenAccessories);
router.get('/fashion/women/accessories/:accessory_id', ctrlfashion.womenAccessoriesReadOne);


router.get('/fashion/women/jewelry', ctrlfashion.womenJewelry);
router.get('/fashion/women/jewelry/:jewelry_id', ctrlfashion.womenJewelryReadOne);


router.get('/fashion/women/handbagsAndWallets', ctrlfashion.handbagAndWallets);
router.get('/fashion/women/handbagsAndWallets/:hansbagsAndWallets_id', ctrlfashion.handbagsAndWalletReadOne);




module.exports = router; 
