import axios from 'axios'
import React, { useState } from 'react'
import {Form,FormGroup,Label,Input,Button,Alert, Row, Col} from 'reactstrap'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostProductComponent() {
   const {dispatchPostProduct} =useGlobalContext()
   const [name,setName] = useState('')
   const [slug,setSlug] = useState('')
   const [category,setCategory] = useState('')
   const [files,setFiles] = useState('')
   const [price,setPrice] = useState('')
   const [countInStock,setCountInStock] = useState('')
   const [brand,setBrand] = useState('')
   const [rating,setRating] = useState(4.5)
   const [numReviews,setNumReviews] =useState(12)
   const [description,setDescription] = useState('')
   const [error,setError] = useState('')
   const [success,setSuccess] = useState('')

const postProduct =async(e)=>{
     e.preventDefault()
     setError('')
     setSuccess('')
     // check type is correct
     console.log(slug)
    const slugCheck = slug.search(' ')
    console.log(slugCheck !== -1 )
        if(slugCheck!==-1 ){
                setError( 'slug should have hypen between of them and not have space');
                return;
        }
const priceCheck = (price <1000 || price >100000000);
        if (priceCheck){
                setError('price is not sense');
                return;
        }
        // REQUEST
        //dispatchPostProduct({type:"FETCH_REQUEST"})
         //data 
        const data = new FormData()
        data.set('name',name)
        data.set('slug',slug)
        data.set('category',category)
        data.set('file',files[0])
        data.set('price',price)
        data.set('countInStock',countInStock)
        data.set('brand',brand)
        data.set('rating',rating)
        data.set('numReviews',numReviews)
        data.set('description',description)
        const response = await fetch(`${process.env.REACT_APP_API}/api/product/post`,{
                method:"POST",
                body:data,
        })
        if(!response.ok){
                setError('Name or slug is existed !!! change them..')
        }
        else{
                setName('');
                setSlug('')
                setCategory('')
                setFiles('')
                setPrice('')
                setCountInStock('')
                setBrand('')
                setDescription('')
                setSuccess('laldla')
                toast.warn('New product is posted, Home, refresh to see result', {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,     
                        draggable: true,
                        progress: 1,
                        theme: "light",
                        });
        }
 
}


  return (
        <Row className='d-flex justify-content-center mt-5 mb-5'>
                <h3 className='text-center'><span style={{color:"#cbba9c"}}>POST</span> PRODUCT</h3>
                <Col md={12} sm={12} lg={4} className='  p-3 mt-5'  style={{background:"rgb(203 186 156 / 33%)"}}>
                {success && <ToastContainer
                                position="top-center"
                                autoClose={false}
                                limit={1}
                                newestOnTop
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                theme="light"
                                />}
                {error && <Alert color='danger'>{error}</Alert>}
                <Form onSubmit={postProduct} className='mb-5'>
                        <FormGroup>
                        <Input
                                placeholder=" Product Name"
                                type="name"
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                        />
                        </FormGroup>
                        <FormGroup>
                                <Input
                                placeholder="Slug"
                                type="text"
                                value={slug}
                                onChange={e=>setSlug(e.target.value)}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                                <Input
                                name="Category"
                                placeholder="Category"
                                type="text"
                                value={category}
                                onChange={e=>setCategory(e.target.value)}
                                required
                                />
                        </FormGroup>
                        
                        <FormGroup>
                                <Input
                                name="file"
                                placeholder="file"
                                type="file"
                                onChange={e=>setFiles(e.target.files)}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                                <Input
                                placeholder="Price"
                                type="Number"
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                                <Input
                                placeholder="Count In Stock"
                                type="Number"
                                value={countInStock}
                                onChange={e=>setCountInStock(e.target.value)}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                                <Input
                                placeholder="Brand"
                                type="text"
                                value={brand}
                                onChange={e=>setBrand(e.target.value)}
                                required
                                />
                        </FormGroup>
                       
                        <FormGroup>
                                <Input
                                placeholder="Descripttion"
                                type="text"
                                value={description}
                                onChange={e=>setDescription(e.target.value)}
                                required
                                />
                        </FormGroup>
                        {/* <Button type="submit">Post Product</Button> */}
                        <button className='btn_all_web' type="submit">
                                <span>New Product</span>
                            </button>
                </Form>
                </Col>
        </Row>
    
  )
}

export default PostProductComponent
