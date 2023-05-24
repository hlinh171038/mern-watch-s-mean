import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useGlobalContext} from '../context'
import {Row,Col } from 'reactstrap'
import Product from './Product'
import Loading from './Loading'
import { ToastContainer, toast } from 'react-toastify';

function Products() {
 const {state}  = useGlobalContext()
 const {products} = state
 console.log(products)
  return (
        <div className='container d-flex jsutify-content-center mt-5'>
              <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                />
            <div className='container '>
                <h1 className='text-center'><span style={{color:"#CBBA9C"}}>Featured</span> Products</h1>
                {!state.loading ?<Loading/>:(state.error ?<div>{state.error}</div>:
                <Row  className='mt-3'>
                    {/* {state.products.map((product) => {
                        return <Product {...product}/>
                    }
                    )} */}
                    {
                        [...state.products].reverse().slice(0,8).map(product =>{
                            return <Product {...product}/>
                        })
                    }
               
                </Row>)}
            </div>
        </div>
    
  )
}

export default Products
