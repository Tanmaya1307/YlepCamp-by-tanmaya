module.exports = func =>{
    return (req,res,next)=>{
        if(!req.isAuthenticated()){
            req.session.returnTo = req.originalUrl
        }
        func(req,res,next).catch(next);
    }
}