import express from 'express'
import User from '../models/UserModel';
import bcrypt from 'bcrypt'
import { generateToken } from '../utils';
const userRouter = express.Router();


userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const userDoc = await User.findOne({email:req.body.email})
    if(userDoc){
        if(bcrypt.compareSync(req.body.password, userDoc.password)){
            res.send({
                _id:userDoc._id,
                name:userDoc.name,
                email:userDoc.email,
                isAdmin:userDoc.isAdmin,
                token:generateToken(userDoc)
            });
            return ;
        }
    }
    res.status(401).send({message:"Invalid email or password"})
})
);

export default userRouter