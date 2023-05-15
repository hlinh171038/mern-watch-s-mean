import React, { useContext,useEffect, useReducer, useState } from "react";


// component
import reducerProducts from "./Reducer/Reducer";
import reducerCarts from "./Reducer/reducerCarts";
import reducerOrder from './Reducer/reducerOrder'
import reducerHistory from "./Reducer/ReducerHistory";
import reducerSearch from "./Reducer/ReducerSearch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import reducerPostProduct from "./Reducer/ReducerBlog";
import reducerBlog from "./Reducer/ReducerBlog";
import reducerAdminOrder from "./Reducer/ReducerAdminOrder";


const AppContext = React.createContext()

const initialProduct ={
    products:[],
    product:[],
    loading:true,
    error:'',
    total:0,
    amount:0
}
const initialCart = {
    cart:localStorage.getItem('cart')?
            JSON.parse(localStorage.getItem('cart')):
            [],
    userInfo:localStorage.getItem('userInfo')?
            JSON.parse(localStorage.getItem('userInfo')):
            null,
    shippingAddress:localStorage.getItem('shippingAddress')?
                    JSON.parse(localStorage.getItem('shippingAddress')):
                    {},
    paymentMethod:localStorage.getItem('paymentMethod')?
                    JSON.parse(localStorage.getItem('paymentMethod')):
                    {},
}
const initialOrder = {
    error:'',
    loading:false,
    order:[]
}
const initialHistory = {
    error:'',
    loading:false,
    orderHistory :null
}
const initialSearch ={
    error :'',
    loading:false,
    products:[],
}
const initialBlog = {
    error:'',
    loading:false,
    blog:[]
}
const initialAdminOrder = {
    error:'',
    loading:false,
    adminOrder:[]
}
const AppProvider = ({children})=>{
    //reducer
    const [state,dispatch] = useReducer(reducerProducts,initialProduct)
    const [carts,dispatchCart] = useReducer(reducerCarts,initialCart)
    const [orders,dispatchOrder] = useReducer(reducerOrder,initialOrder)
    const [historys,dispatchHistory] = useReducer(reducerHistory,initialHistory)
    const [searchs, dispatchSearch] =useReducer(reducerSearch,initialSearch)
    const [blogs,dispatchBlog] =useReducer(reducerBlog,initialBlog)
    const [adminOrders,dispatchAdminOrders] = useReducer(reducerAdminOrder,initialAdminOrder)

    // state
    const [searchProduct,setSearchProduct] = useState([])
    const [productFilter,setProductFilter] = useState([])
    const [errorSearch,setError] = useState('')
    const [search,setSearch] =useState('')
    const [searchResult,setSearchResult] = useState([])
    //add to cart
    const addToCart = async(id)=>{
        
       // check if the result have existed in cart
       const existItem = carts.cart.find(x=> x._id ===id);
       const quantity = existItem ? existItem.quantity +1:1
       // fecth data(backend to check)
       const response = await fetch(`${process.env.REACT_APP_API}/api/product/${id}`)
       const data = await response.json()
       if(data.countInStock< quantity){
        window.alert('Quantity is out of stock');
        return;
       }
       dispatchCart({type:"ADD_TO_CART",payload:{...data,quantity}})
    }
   //---------------------------------------------------------search---------------------------------------------------------------------------//
    // get data
    useEffect(()=>{
        dispatchSearch({type:"FETCH_REQUEST"})
        axios.get(
            `${process.env.REACT_APP_API}/api/products/search`
        ).then(res =>{
            const {data} = res;
            console.log(data)
            dispatchSearch({type:"FETCH_SUCCESS",payload:data})
            setSearchProduct(data )
            setProductFilter(data)
        }).catch (err=>{
            dispatchSearch({type:"FETCH_FAIL",payload:err})
        })
    }, [ ])
    
    
    // -------------------------------------------------------------------------------------------------------products-------------------------------------
   useEffect(()=>{
    const fetchData = async()=>{
        dispatch({type:"FETCH_REQUEST"})
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/product`)
            const result = await response.json();
            dispatch({type:"FETCH_SUCCESS",payload:result})
        } catch (error) {
            console.log('try')
            dispatch({type:"FETCH_ERROR",payload:error.message})
        }
    } 
    fetchData()
   },[])
    return <AppContext.Provider value={{
        state,
        dispatch,
        carts,
        dispatchCart,
        addToCart,
        orders,
        dispatchOrder,
        historys,
        dispatchHistory,
        searchs,
        dispatchSearch,
        productFilter,
        setProductFilter,
        searchProduct,
        setSearchProduct,
        setError,
        errorSearch,
        search,
        setSearch,
        searchResult,
        setSearchResult,
        blogs,
        dispatchBlog,
        adminOrders,
        dispatchAdminOrders
    }}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppProvider,useGlobalContext};