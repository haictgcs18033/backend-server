const jwt = require('jsonwebtoken')
exports.requireSignin = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.TOKEN);
        req.user = user;
    }else{
        return res.status(400).json({
            msg:'authorization required'
        })
    }
   next();
}
exports.userMiddleware=(req,res,next)=>{
    if(req.user.role !=='customer'){
        return res.status(400).json({
            message:'Customer Access Denied'
        })
    }
    next()
}
exports.adminMiddleware=(req,res,next)=>{
  
    if(req.user.role !=='admin'){
        return res.status(400).json({
            message:'Admin Access Denied'
        })
    }
     next()
}