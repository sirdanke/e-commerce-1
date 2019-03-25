var express = require('express');
var router = express.Router();
const images = require('../middlewares/images')
const access = require('../middlewares/access')
const {isAdmin} = require('../middlewares/isAdmin')
const productController = require('../controllers/productController')


router.get('/products/:id', productController.getById)

router.get('/products', productController.findAll)

router.post('/products',access, isAdmin, images.multer.single('image'), 
images.sendUploadToGCS, productController.create)

router.delete('/products/:id', access, isAdmin, productController.delete)

router.patch('/products/returned/:id', access, productController.returnOldStock)

router.patch('/products/:id', access, isAdmin,images.multer.single('image'), 
images.sendUploadToGCS, productController.update)


module.exports = router;
