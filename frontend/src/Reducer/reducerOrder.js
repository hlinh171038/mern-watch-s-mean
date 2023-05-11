const reducerOrder = (orders,action) =>{
    switch(action.type){
        case "CREATE_REQUEST":
            return {...orders,loading:true}
        case 'CREATE_SUCCESS':
            return {...orders,loading:false}
        case 'CREATE_FAIL':
            return {...orders,loading:false}
        case 'FETCH_REQUEST':
            return {...orders,loading:true}
        case 'FETCH_SUCCESS':
            return {...orders,loading:false,order:action.payload}
        case 'FETCH_FAIL':
            return {...orders,loading:false}
        default:
            return orders
    }
}
export default reducerOrder;