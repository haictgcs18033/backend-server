var express=require('express')
const { getOrder, addOrder, getOneOrder } = require('../controllers/order')
const { requireSignin } = require('../middleware/middleware')
const router=express.Router()
router.get('/',requireSignin,getOrder)
router.post('/add-order',requireSignin,addOrder)
router.post('/get-one-order',requireSignin,getOneOrder)
module.exports=router