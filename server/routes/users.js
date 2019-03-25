var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const access = require('../middlewares/access')
const updateStock = require('../middlewares/updateStock')

const cekProductInsideCart = require('../middlewares/cekProductInsideCart')

/* GET users listing. */
router.post('/',userController.register)

router.post('/login', userController.login)

router.patch('/cart', access, cekProductInsideCart, updateStock, userController.addProductToCart)

router.get('/cart', access, userController.getUserCart)

router.post('/verification', access, userController.tokenVerification)

module.exports = router;