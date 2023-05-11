import express from 'express'
import mongoose, { Query } from 'mongoose';
import data from './data.js'
import cors from 'cors'
import bcrypt, { hashSync } from 'bcrypt'
import { generateToken,isAuth } from './utils.js';
import expressAsyncHandler from 'express-async-handler'
import path from 'path';
const __dirname = path.resolve();
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' })
import fs from 'fs'
//routes
import seedRouter from './routes/seedRoutes.js';

// model 
import Product from './models/ProductModel.js'
import User from './models/UserModel.js';
import Order from './models/OrderModel.js';
import Blog from './models/BlogModel.js';
import dotenv from 'dotenv'
dotenv.config();

//import productRouter from './routes/ProductRoutes.js';


mongoose.connect(process.env.MONGODB_URI)
        .then(()=>{
            console.log('connect to mongoose is success');
        })
        .catch(error=>{
            console.log(error.message)
        })
var salt = bcrypt.genSaltSync(10);
const app = express();
app.use('/api/seed',seedRouter)

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

// app.use(express.static(path.join(__dirname,'./frontend/build')))
// app.get('*', (req,res)=>{
//     res.sendFile(path.join(__dirname, './frontend/build/index.html'))
// })



//------------------------------------------------------------user------------------------
app.post('/api/users/signin',async(req,res)=>{
    const {email,password} = req.body;
    try {
        const userDoc = await User.findOne({email})
        const re = bcrypt.hashSync(password,salt)
        const passOk = bcrypt.compareSync(password,userDoc.password)
        if(passOk){
            res.send({
                _id:userDoc._id,
                name:userDoc.name,
                email:userDoc.email,
                isAdmin:userDoc.isAdmin,
                token:generateToken(userDoc)
            });
            return;
        }
        res.status(404).json('password is wrong');
    } catch (error) {
        res.status(500).json('wrong email')
    }
})
 
// sign up 
app.post('/api/users/signup',async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const userDoc = new User({
            name,
            email,
            password:hashSync(password,salt)
        });
        const user = await userDoc.save()
        res.send({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user)
        });
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})
// updata profile when user have sign in and want to updatae thier profile
app.put('/api/users/update',isAuth,async(req,res)=>{
    const {name,email,password} = req.body;
    const {_id} = req.user
    try {
        const userDoc = await User.findById(_id)
        if(userDoc){
            userDoc.name = name ||userDoc.name;
            userDoc.email = email || userDoc.email;

            if(password){
                userDoc.password = bcrypt.hashSync(password,salt)
            }
        }
        const updated = await userDoc.save();
        res.send({
            _id:updated._id,
            name:updated.name,
            email:updated.email,
            isAdmin:updated.isAdmin,
            token:generateToken(updated)
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})
//-------------------------------------------------------------product-------------------------------
// app.get('/api/product',(req,res)=>{
//     res.send(data.products)
// })
app.get('/api/product',async(req,res)=>{
    try {
        const productDoc = await Product.find()
        res.status(200).send(productDoc)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
// detail  product api
app.get('/api/product/slug/:slug',async(req,res)=>{
    try {
        const productDoc = await Product.findOne({slug:req.params.slug});
        if(productDoc){
            res.status(200).send(productDoc)
        }else{
            res.status(404).send({message:'Product not found'})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
// get card
app.get('/api/product/:id',async(req,res)=>{
    try {
        const cardDoc = await Product.findById(req.params.id)
        if(cardDoc){
            res.status(200).send(cardDoc)
        }else{
            res.status(404  ).send({message:"Product not found"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

//post product to server
app.post ('/api/product/post',uploadMiddleware.single('file'),async(req,res) =>{
   const {name,slug,category,price,countInStock,brand,rating,numReviews,description} =req.body
   const {destination,filename,originalname,path} =req.file
   let parts = originalname.split('.');
   let ext = parts[parts.length -1];
    let newPath = destination + filename + '.'+ ext;
    fs.renameSync(path, newPath)
    try {
        const productDoc = new Product ({
            name,
            slug,
            image:newPath,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
        })
        const product = await productDoc.save()
        res.send({
            _id:product._id,
            name:product.name,
            slug:product.slug,
            image:product.image,
            brand:product.brand,
            category:product.category,
            description:product.description,
            price:product.price,
            countInStock:product.countInStock,
            rating: product.rating,
            numReviews:product.numReviews,
            token:generateToken(product)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
//-------------------------------------------------------------------------------order-----------------

// post info when fill all infomation and click order place
app.post('/api/orders',isAuth,async(req,res)=>{
    const {orderItems,shippingAddress,itemsPrice,paymentMethod,shippingPrice,taxPrice,totalPrice} = req.body
    const orderDoc = new Order({
        orderItems:orderItems.map((x) =>({...x,product:x._id})),
        shippingAddress:shippingAddress,
        paymentMethod:paymentMethod,
        itemsPrice:itemsPrice,
        shippingPrice:shippingPrice,
        taxPrice:taxPrice,
        totalPrice:totalPrice,
        user:req.user._id
    })
    const order= await orderDoc.save();
    res.send(order)
})

//get info with user id to show in history pages
app.get('/api/orders/history',isAuth,async(req,res) =>{
    const {_id} = req.user // isAuht
    try {
        const historyDoc = await Order.find({user:_id})
        if(historyDoc){
            res.send(historyDoc)
        }else{
            res.status(404).send({message:" History Not Found"})
        }
        
    } catch (error) {
        res.status(500).send({message:error.message})
    }
    
})
// get info(order ) to detail order from mongodb
app.get('/api/orders/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const orderDoc  = await Order.findById(id)
        res.status(200).send(orderDoc)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})


//------------------------------------------------------search-----------------------------------------------------
// get categories form mongodb to use
app.get('/api/products/catagories',async(req,res) =>{
    try {
        const cate = await Product.find().distinct('category');
        res.send(cate)
    } catch (error) {
        res.send(error)
    }
})
//
const PAGE_SIZE = 3
app.get('/api/products/search',async(req,res)=>{
    try {
        const searchDoc = await Product.find()
        res.send(searchDoc)
    } catch (error) {
        res.status(500).send(error)
    }
})
//----------------------------------------------------------blog--------------------------------------------------------------

app.post('/api/blog/post',uploadMiddleware.single('file'),async(req,res) =>{
    const {title,summary,content} = req.body;
    const {destination,filename,originalname,path} =req.file;
    let parts = originalname.split('.');
    let ext = parts[parts.length -1];
    let newPath = destination+filename+'.'+ext
    fs.renameSync(path,newPath)
    try {
        const blogDoc = new Blog ({
            title,
            summary,
            content,
            cover:newPath,
            
        })
        const blog = await blogDoc.save();
        res.send({
            _id:blog._id,
            title:blog.title,
            summary:blog.summary,
            content:blog.content,
            cover:blog.cover,
            token:generateToken(blog)
        })
    } catch (error) {
        res.status(500).send(error)
    }
    
})
// get blog
app.get('/api/blog',async(req,res)=>{
    try {
        const blogDoc = await Blog.find()
        res.send(blogDoc)
    } catch (error) {
        res.status(500).send(error)
    }
})

// get detail blog
app.get('/api/blog/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const blogDoc = await Blog.findById(id)
        res.send(blogDoc)
    } catch (error) {
        res.status(500).send(error)
    }
 })
////////////////////////////////////////////////////////////////////admin/////////////////////////////////////////////////
//get orders pill 
app.get('/api/orders',async(req,res)=>{
   try {
    const ordersDoc = await Order.find()
    res.send(ordersDoc)
   } catch (error) {
    res.status(500).send(error)
   }
})
// get all user
app.get('/api/users',async(req,res)=>{
    try {
        const usersDoc = await User.find()
        res.send(usersDoc)
    } catch (error) {
        res.status(500).send(error)
    }
   
})
//get detail with id in the order history page (admin)
app.get('/api/detail-history/:id',async(req,res)=>{
    const {id} =req.params;
    
    try {
        const detailDoc = await Order.findById(id)
        res.send(detailDoc)
    } catch (error) {
        res.status(500).send(error)
    }
})
// updata blog (admin)
app.put('/api/blog/update',uploadMiddleware.single('files'),async(req,res)=>{
    const {title,summary,files,id,value} =req.body;

   try {
    const blogDoc = await Blog.findById(id)
    if(blogDoc){
       blogDoc.title = title || blogDoc.title
       blogDoc.summary = summary || blogDoc.summary
       blogDoc.files = files || blogDoc.cover
       blogDoc.content = value || blogDoc.content 
    }
    const result = await blogDoc.save()
    res.send({
        _id:result._id,
        title:result.title,
        summary:result.summary,
        cover:result.cover,
        content:result.content,
        token:generateToken(result)
    })
   } catch (error) {
    res.status(500).send(error)
   }

})

// app listen
app.listen(5000,()=>{
    console.log('app running in port 5000')
})