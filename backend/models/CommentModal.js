import mongoose from "mongoose";

const schema  =  new mongoose.Schema({
    reviewItems:[
        {
           rating:{type:Number, required:true},
           content:{type:String},
           user:{type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    required: true,
                },
            product:{type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                } 
        }
    ]
},{timestamps:true})

const Comment = mongoose.model('Comment',schema)
export default Comment