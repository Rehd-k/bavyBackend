const express = require('express');
router = express.Router();

const ctrlMaterial = require('../controller/materials')

router.get('/materials', ctrlMaterial.materialIterms);
router.get('/materials/findone/:material_id', ctrlMaterial.materialItermsReadone);


router.get('/materials/fabrics', ctrlMaterial.fabricIterms);
router.get('/materials/fabrics/:fabirc_id', ctrlMaterial.fabricItermsReadOne);


router.get('/materials/leather', ctrlMaterial.leatherIterms);
router.get('/materials/leather/:leather_id', ctrlMaterial.leatherItermsReadOne);

module.exports = router;  