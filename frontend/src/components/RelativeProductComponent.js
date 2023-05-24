import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from "reactstrap";
import { useGlobalContext } from '../context'
import axios from "axios";
import { compareAsc, format } from 'date-fns'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Link } from "react-router-dom";
import Product from "./Product";
import Rating from './Rating'


function MultipleItems (...product) {
  
    const {blogs,dispatchBlog,carts} = useGlobalContext()
    const [err,setErr]  = useState('')
    const [productData,setProductData] = useState(null)
    const {blog,error,loading} = blogs
    console.log(productData)
    console.log( product[0].category)
    let filterData = productData && [...productData].filter(item =>item.category === product[0].category)
   useEffect(()=>{
    dispatchBlog({type:'FETCH_REQUEST'})
    axios.get(`${process.env.REACT_APP_API}/api/product`)
        .then(res=>{
            console.log(res.data)
            const {data } = res;
            setProductData(data)
            dispatchBlog({type:'FETCH_SUCCESS',payload:data})
        }).catch(err =>{
            console.log(err)
            dispatchBlog({type:'FETCH_FAIL',payload:err})
        })
},[])

   console.log(blogs)
   console.log(productData)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint:1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
        <Row className="carousel_container ">
            <div className="carousel_cover"></div>
            <Row  >
                <Col sm={12}>
                    <div className="container">
                    <h2 className="text-white text-center mt-3 mb-3 text-uppercase">May be you like</h2>
                    <Row >
                      
                                { productData && [...productData].filter(item =>item.category === product[0].category).reverse().slice(0,6).map(product=>{
                                return <Col lg={2} md={4} sm={6} className="">
                                <Card key={product.slug} className='relative_card'>
                                <Link to={`/product/${product.slug}`}>
                                    <img src={`${process.env.REACT_APP_API}/`+product.image} alt={product.name} className='product_relative__img' />
                                </Link>
                                <CardBody>
                                    <Link to={`/product/${product.slug}`}>
                                        <CardTitle className='text-capitalize'>{product.name.length >15 ? product.name.substring(0,10)+'...':product.name}</CardTitle>
                                    </Link>
                                    <Rating rating={product.rating} numReviewer = {product.numReviews}/>
                                    <CardText>
                                        {product.price} VNĐ
                                    </CardText>
                                   
                                </CardBody>       
                                </Card>                                  
                         </Col>
                          
                                                
                            })}
                       
                    </Row>
                </div>
                </Col>
                
            </Row>
        </Row>
      
    );
  }

  export default MultipleItems
