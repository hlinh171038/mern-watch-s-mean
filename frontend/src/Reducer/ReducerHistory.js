const reducerHistory = (action,historys) =>{
    switch( action.type){
        case 'FECTCH_REQUEST':
            return {...historys,loading:true}
        case 'FETCH_SUCCESS':
            return {...historys,loading:false,orderHistory:action.payload}
        case 'FETCH_FAIL':
            return {...historys,loading:false,error:action.payload}
        default:
            return historys
    }
}
export default reducerHistory;