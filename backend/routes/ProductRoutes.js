import express from 'express'
import Product from '../models/ProductModel'

const productRouter = express.Router()

//get all products
// productRouter.get('/',async(req,res)=>{
//     const products = await Product.find();
//     res.send(products)
// })

// detail  product api
// productRouter.get('/slug/:slug',async(req,res)=>{
//     try {
//         const productDoc = await Product.findOne({slug:req.params.slug});
//         if(productDoc){
//             res.status(200).send(proreductDoc)
//         }else{
//             res.status(404).send({message:'Product not found'})
//         }
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })
// get card
// productRouter.get('/:id',async(req,res)=>{
//     try {
//         const cardDoc = await Product.findById(req.params.id)
//         if(cardDoc){
//             res.status(200).send(cardDoc)
//         }else{
//             res.status(404).send({message:"Product not found"})
//         }
//     } catch (error) {
//         res.status(500).json({message:error.message})
        
//     }
// })
export default productRouter;