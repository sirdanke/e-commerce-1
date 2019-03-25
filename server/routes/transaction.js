const router = require('express').Router()
const access = require('../middlewares/access')
const transactionController = require('../controllers/transactionController')
// const access = require('../middlewares/access')
const {isAdmin} = require('../middlewares/isAdmin')

router.get('/',access, isAdmin, transactionController.getAllTransaction)

router.get('/user', access, transactionController.getByUserId)

router.post('/', access, transactionController.create)

router.patch('/:id', access, transactionController.updateStatus)

module.exports = router