import jwt from "jsonwebtoken"
const secret ='somethingsecret'

export const generateToken = (user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    }, 
    secret,
    {expiresIn: 604800})
}

export const isAuth = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7,authorization.length); // Bearer XXXXXX
        jwt.verify(
            token,
            secret,
            (err,decode) =>{
                if(err){
                    res.status(401).send({message: 'Invalid Token'});
                }else{
                    req.user = decode;
                    next();
                }
            }
        )
    }else {
        res.status(401).send({message: 'No Token'});
    }
}