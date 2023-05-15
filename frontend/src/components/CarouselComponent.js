import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from "reactstrap";
import { useGlobalContext } from '../context'
import axios from "axios";
import { compareAsc, format } from 'date-fns'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Link } from "react-router-dom";


function MultipleItems () {
  
    const {blogs,dispatchBlog,carts} = useGlobalContext()
    const [err,setErr]  = useState('')
    const [carouselData,setCarouselData] = useState(null)
    const {blog,error,loading} = blogs
    console.log(blog)

   useEffect(()=>{
    dispatchBlog({type:'FETCH_REQUEST'})
    axios.get(`${process.env.REACT_APP_API}/api/blog`)
        .then(res=>{
            console.log(res.data)
            const {data } = res;
            setCarouselData(data)
            dispatchBlog({type:'FETCH_SUCCESS',payload:data})
        }).catch(err =>{
            console.log(err)
            dispatchBlog({type:'FETCH_FAIL',payload:err})
        })
},[])

   console.log(blogs)
   console.log(carouselData)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint:1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 1,
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
                    <h2 className="text-white text-center mt-3 mb-3"> Our Blog</h2>
                    <Slider {...settings} className="">
                      {carouselData && [...carouselData].reverse().slice(0,8).map(item =>{
                        return <div className="d-flex justify-content-center">
                                    <Card
                                        style={{
                                            width: '20rem',
                                            borderRadius:"none",
                                           
                                        }}
                                        >
                                        <img
                                            className="carousel_img"
                                            alt="Sample"
                                            src={`${process.env.REACT_APP_API}/`+item.cover}
                                        />
                                        <CardBody>
                                            <CardTitle tag="h5" className="text-uppercase">
                                            {item.title.substring(0,20)} ...
                                            </CardTitle>
                                            <div
                                            className="mb-2 text-muted small d-flex align-items-center"
                                            style={{fontSize:"13px"}}
                                            >
                                            <AccessTimeFilledIcon className=" me-1" style={{fontSize:"15px"}}/>
                                            {format(new Date(item.updatedAt), 'dd-MM-yyyy')}
                                            
                                            </div>
                                            <CardText>
                                                {item.summary.substring(0,60)}...
                                            </CardText>
                                            <Link to={`/blog/${item._id}`} className="text-decoration-none">
                                              <div className="d-flex justify-content-center">
                                                  <div className='btn_all_web'>
                                                      <span className="text-decoration-none">See More</span>
                                                  </div>
                                              </div>
                                            </Link>
                                        </CardBody>
                                        </Card>
                                    </div>
                      })}
                    
                    
                    </Slider>
                </div>
                </Col>
                
            </Row>
        </Row>
      
    );
  }

  export default MultipleItems