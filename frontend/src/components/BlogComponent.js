import React from 'react'
import { Card, CardBody, CardGroup, CardText, CardTitle, Col ,Row} from 'reactstrap'
import { compareAsc, format } from 'date-fns'
import { Link } from 'react-router-dom'

function BlogComponent({...item}) {

   
    const {title,summary,content,cover,createdAt} = item
  return (
    <Link to={`/blog/${item._id}`} className='blog_container'>
        <Card className='mb-3'>
            <Row  className='over-flow-hidden' >
                    <Col sm={12} md={12} lg={4}  style={{height:'250px'}}>
                        <img src={process.env.REACT_APP_API+'/'+cover} className=' blog_img w-100 h-100' />
                    </Col>
                    <Col sm={12} md={12} lg={8}>
                        <CardGroup>
                            <CardBody>
                                <CardTitle className='text-secondary fw-bold text-uppercase'>{title.length >40 ?title.substring(0,40)+'...':title}</CardTitle>
                                <div className='d-flex small mt-3 mb-3'>
                                    <div className='text-secondary me-5 text-capitalize small'><i class="fa-regular fa-user "></i>  Linh</div>
                                <div className='text-secondary small'>{format( new Date(createdAt), 'dd-MM-yyyy HH-mm-ss')}</div>
                                </div>
                                <CardText className='text-secondary '>{summary.length >150 ? summary.substring(0,150)+'...':summary}</CardText>
                            </CardBody>
                        </CardGroup>
                    </Col>
            </Row>
            </Card>
    </Link>
  )
}

export default BlogComponent
