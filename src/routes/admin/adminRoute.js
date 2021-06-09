const express = require('express')
const { signup, signin } = require('../../controllers/admin/authAdmin')
const { validateSigninRequest, isRequestValidated } = require('../../validators/auth')
const {requireSignin, adminMiddleware}=require('../../middleware/middleware')
const { updateOrderStatus, getCustomerOrders, deleteCustomerOrders } = require('../../controllers/admin/adminOrder')
const router = express.Router()
// Import Schema

router.post('/signin',validateSigninRequest,isRequestValidated, signin)
router.post('/signup',validateSigninRequest,isRequestValidated, signup)
// router.post('/signout',requireSignin,signout)
// router.post('/post',requireSignin,(req,res)=>{
//     res.send('post')
// })
router.post('/orderStatus',requireSignin,adminMiddleware,updateOrderStatus)
router.get('/getOrder',requireSignin,adminMiddleware,getCustomerOrders)
router.post('/deleteOrder',requireSignin,adminMiddleware,deleteCustomerOrders)

module.exports = router
    