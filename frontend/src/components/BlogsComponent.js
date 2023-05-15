import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Alert, Card, CardBody, CardGroup, CardText, CardTitle, Col ,Container,Row} from 'reactstrap'
import { useGlobalContext } from '../context'
import BlogComponent from './BlogComponent'
import Loading from './Loading'
import BlogRightSideConponent from './BlogRightSideConponent'
import { Link } from 'react-router-dom'

function BlogsComponent() {
    const {blogs,dispatchBlog,carts} = useGlobalContext()
    const [err,setErr]  = useState('')
    const [blogData,setBlogData] = useState(null)
    const [loadingPage,setLoadingPage] = useState(false)
    const {blog,error,loading} = blogs
    console.log(loadingPage)
    useEffect(()=>{
        setLoadingPage(false)
        console.log(loadingPage)
        dispatchBlog({type:'FETCH_REQUEST'})
        axios.get(`${process.env.REACT_APP_API}/api/blog`)
            .then(res=>{
                console.log(res.data)
                const {data } = res;
                setBlogData(data)
                setLoadingPage(true)
        console.log(loadingPage)
                dispatchBlog({type:'FETCH_SUCCESS',payload:data})
            }).catch(err =>{
                console.log(err)
                setLoadingPage(false)
                dispatchBlog({type:'FETCH_FAIL',payload:err})
            })
    },[])
    console.log(blogData)
  return <div>
            <div className="about_container_img bg-image" >
                <img src ="https://images.pexels.com/photos/179911/pexels-photo-179911.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className='w-100 h-100 img-fluid shadow-2-strong hover-shadow'/>
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='d-flex justify-content-center flex-column align-items-center'>
                        <p className='text-white mb-0 text-uppercase fs-4 fw-bold'>Blogs</p>
                        <p className='text-white mb-0 text-uppercase mt-3'>Home Page / <strong style={{color:"#cbba9c"}}>Blogs</strong></p>
                    </div>
                    </div>
                </div>
            </div>
            <div className='w-100'>
            {!loadingPage ? <Loading/>  
                    :
                   <Row >
                    <Col sm={12} md={12} lg={9} className='mt-5'>
                       <Container className='w-75'>
                                 
                        {blogData && [...blogData].reverse().slice(0,5).map(item =>{
                            return <BlogComponent key={item._id} {...item} />
                        })}
                       </Container>
                    </Col>
                    <Col sm={12} md={12} lg={3} className='ps-3' style={{background:"rgb(203 186 156 / 33%)"}}>
                        <div className="fw-5 text-uppercase fw-bold fs-4 mt-5 mb-3">hot blogs today</div>
                    {blogData && [...blogData].reverse().slice(0,8).map(item =>{
                        return <div>
                                 <Link to={`/blog/${item._id}`} className='text-lowercase ms-3 small fst-italic'>
                                    {item.title.length>40 ? item.title.substring(0,40)+" ...":item.title}
                                </Link>
                              </div>
                    })}
                    <div className="text-uppercase fw-bold fs-4 mt-5 mb-3">hots blogs in weeks</div>
                    {blogData && blogData.slice(0,8).map(item =>{
                        return <div>
                             <Link to={`/blog/${item._id}`} className='text-lowercase ms-3 small fst-italic'>
                                    {item.title.length>40 ? item.title.substring(0,40)+" ...":item.title}
                                </Link>
                        </div>
                    })}
                    </Col>
                    </Row>
                    }
            </div>
        </div>
}

export default BlogsComponent
