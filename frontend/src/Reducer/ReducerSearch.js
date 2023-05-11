const reducerSearch = (action,searchs) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...searchs,loading:true}
        case 'FETCH_SUCCESS':
            return {...searchs,
                    loading:false,
                    products:action.payload.products,
                   }
        case 'FETCH_FAIL':
            return {...searchs,loading:false,error:action.payload}
      
        default:
            return searchs
    }
}
export default reducerSearch