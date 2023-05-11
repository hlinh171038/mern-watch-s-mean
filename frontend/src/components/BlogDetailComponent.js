import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { compareAsc, format } from 'date-fns'
import { Link, useParams } from 'react-router-dom'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { useGlobalContext } from '../context'

function BlogDetailComponent() {
    const {blogs} = useGlobalContext()
    const [blogData,setBlogDdata] = useState([])
    const now = format(new Date(), 'yyyy-MM-dd');
    const custTime = '18:00:00.000';
    const custDt = new Date(`${now} ${custTime}`);
    const param = useParams()
    const {id} = param

    const {title,cover,createdAt,summary,content} = blogData
    const {blog,error,loading} = blogs
    console.log(blog)
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/api/blog/${id}`)
        .then(res =>{
            const {data } =res;
            console.log(data)
            setBlogDdata(data)
        }).catch(error =>{
            console.log(error)
        })
    },[])
  return (
    
    <div style={{overflow:"hidden"}} className='container mt-5 mb-3'>
        <Row  >
        <Col md={9} id='blog__detail_col1__cover'  >
            <div className='square border p-3 blog__detail__col1'>
                <div className=''>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link to="/blog" className='small text-muted text-decoration-none ' style={{borderBottom:"1px solid grey"}}>News</Link>
                        <Link to={`/edit/${id}`}>Edit Blog</Link>
                    </div>
                    
                    <div className='text-capitalize  text-dark fs-1 text fw-bold mt-1 mb-1'>{title}</div>
                    <hr/>
                   
                    <div className='text-muted small mb-3  '>
                        <span className='me-1'><span className='me-1'>Post by</span>Linh</span>| time :
                        <span className='ms-1'>27-04-2023</span>
                    </div>
                </div>
                <div className='blog__detail__img__container' >
                    <img src={`${process.env.REACT_APP_API}/`+cover} className='w-100'/>
                </div>
               
                <div className='mt-3 blog__detail__text'>
                    <div className='text-dark text-justify'>
                        <div>{summary}</div>
                        <div dangerouslySetInnerHTML={{__html:content}}/>
                    </div>
                </div>
            </div>
        </Col>
        <Col md={3} className=''>
            <div id='blog__detail__border'>
                <h3 className='text-uppercase ms-1'>you may <span style={{color:"#cbba9c"}}>be like</span></h3>
                <div className='border p-3 ' style={{background:"rgb(203 186 156 / 33%)"}}>
                {blog && [...blog].reverse().map(item=> {
                    return <CardBody className='d-flex align-items-center mb-3' >
                                    <div className='square bg-primary rounded-circle blog__detail__img_round__cover  '>
                                        <img src={`${process.env.REACT_APP_API}/`+item.cover}
                                                className=' blog__detail__img_round'/>
                                    </div>
                                    <div className='title ms-3 text-uppercase ' >
                                      <Link to={`/blog/${item._id}`} className='text-uppercase ms-1 text-dark text-decoration-none '>
                                         {item.title.length>40 ? item.title.substring(0,20)+" ...":item.title}
                                      </Link>
                                    </div>
                                    
                            </CardBody>
                })}
                </div>
            </div>
            
        </Col>
    </Row>
    </div>
  )
}

export default BlogDetailComponent
