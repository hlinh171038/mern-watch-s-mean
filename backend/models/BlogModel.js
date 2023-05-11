import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    title:{
        type:String,
    },
    summary:{
        type:String,
    },
    content:{
        type:String,
    },
    cover:{
        type:String
    }
    
},{timestamps:true})

const Blog = mongoose.model('Blog',schema);
export default Blog