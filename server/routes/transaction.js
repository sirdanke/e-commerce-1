const router = require('express').Router()
const access = require('../middlewares/access')
const transactionController = require('../controllers/transactionController')
// const access = require('../middlewares/access')
const {isAdmin} = require('../middlewares/isAdmin')
const {getCity, getCost} = require('../controllers/rajaOngkirApi')

router.get('/',access, isAdmin, transactionController.getAllTransaction)

router.get('/user', access, transactionController.getByUserId)

router.post('/', access, transactionController.create)

router.patch('/:id', access, transactionController.updateStatus)

router.get('/city', access, getCity)

router.post('/cost', access, getCost)

module.exports = router