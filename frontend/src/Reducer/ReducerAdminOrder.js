const reducerAdminOrder = (action,adminOrders) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...adminOrders,loading:true}
        case 'FETCH_SUCCESS':
            return {...adminOrders,loading:false, adminOrder:action.payload}
        case 'FETCH_FAIL':
            return {...adminOrders,loading:false,error:action.payload}
        default:
            return adminOrders
    }
}
export default reducerAdminOrder