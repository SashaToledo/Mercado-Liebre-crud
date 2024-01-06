// ************ Require's ************
const express = require('express');
const router = express.Router();



// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/upload');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/agregalo',upload.single("images"), productsController.store); 



/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/editar/:id',upload.single('images'), productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
