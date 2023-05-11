const reducerProducts =(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":
            return {...state,loading:false};
        case 'FETCH_SUCCESS':
            return {...state,products:action.payload,loading:true};
        case 'FETCH_ERROR':
            return {...state,loading:false,error:action.payload}
        case 'FETCH_REQUEST_DETAIL':
            return {...state,loading:false};
        case 'FETCH_SUCCESS_DETAIL':
            return {...state,loading:true,product:action.payload}
        case 'FETCH_ERROR_DETAIL':
            return {...state,error:action.payload}
        default:
            return state;
    }
}
export default reducerProducts;