const jwt = require('jsonwebtoken');

const requireLogin = (req,res,next)=>{
    try {
        const token = req.header("Authorization");
    
        if(!token){
            return res.status(401).json({error: "Signup or Signin required"});
        }

        jwt.verify(token, process.env.SECRET_TOKEN, (err, user)=>{
            if(err){
                return res.status(401).json({error: "Signup or Signin required"});
            }
            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}

module.exports = requireLogin;