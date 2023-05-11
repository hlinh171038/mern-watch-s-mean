
const reducerCarts = (carts,action) =>{
    switch(action.type){
        case "ADD_TO_CART":
            //add to cart
            const item = action.payload;
            const isExsixtInCarts = carts.cart.find(x=>x._id === item._id)
            const result =isExsixtInCarts ? 
               carts.cart.map(it=>{
                   return  it._id === isExsixtInCarts._id ? item :it
                })
             : [...carts.cart,item]
             localStorage.setItem('cart',JSON.stringify(result))
            return {...carts,cart:result}
        case 'DELETE_ITEM':
            //delete cart item
            const currentItem = action.payload;
            const resultDe = carts.cart.filter(item=>{
                return item._id !== currentItem._id;
            })
            localStorage.setItem('cart',JSON.stringify(resultDe))
            return {...carts,cart:resultDe}
        case "USER_SIGNIN":
            return  {...carts,userInfo:action.payload}
        case "USER_SIGNOUT":
            return {...carts,userInfo:null,cart:[],shippingAddress:{},paymentMethod:''}
        case "SAVE_SHIPPING_ADDRESS":
            return {...carts,shippingAddress:action.payload}
        case "PAYMENT__METHOD__SAVE":
            return {...carts,paymentMethod:action.payload}
        case "CART_CLEAR":
            return {...carts,cart:[]}
        default:
            return carts
    }
}

export default reducerCarts;