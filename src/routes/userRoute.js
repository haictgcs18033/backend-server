const express = require('express')
const { signup, signin } = require('../controllers/authUser')
const {requireSignin}=require('../middleware/middleware')
// Validation 

const { validateSignupRequest, isRequestValidated,validateSigninRequest } = require('../validators/auth')
const router = express.Router()
// Import Schema

router.post('/signin',validateSigninRequest,isRequestValidated,signin)
router.post('/signup',validateSignupRequest,isRequestValidated, signup)
router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({user:'profile'})
})
module.exports = router
