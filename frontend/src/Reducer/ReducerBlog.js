const reducerBlog = (action,blogs) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...blogs,loading:true}
        case 'FETCH_SUCCESS':
            return {...blogs,loading:false, blog:action.payload}
        case 'FETCH_FAIL':
            return {...blogs,loading:false,error:action.payload}
        default:
            return blogs
    }
}
export default reducerBlog