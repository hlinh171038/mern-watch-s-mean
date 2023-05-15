import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Card, CardBody, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { useGlobalContext } from '../context'
import Loading from '../components/Loading'
import { compareAsc, format } from 'date-fns'

function DetailHistoryComponent() {
    const {adminOrders,dispatchAdminOrders} = useGlobalContext()
    const [orders,setOrders] =useState([])
     const {error,loading,adminOrder} = adminOrders;

 const {id} =useParams()
 console.log(adminOrders.adminOrder)
    useEffect(()=>{
        dispatchAdminOrders({type:'FETCH_REQUEST'})
        axios.get(`${process.env.REACT_APP_API}/api/detail-history/${id}`)
             .then(res =>{
                const {data } = res;
                console.log(data)
                setOrders(data)
                dispatchAdminOrders({type:'FETCH_SUCCESS',payload:data})
             })
             .catch(err =>{
                console.log(err)
                dispatchAdminOrders({type:'FETCH_FAIL',payload:err})
             })
    },[])
  
  return (
      <div className='container'>
        
      <h1 className="my-3 text-center mb-5"> <span style={{color:"#cbba9c"}}>Detail</span> Order {id}</h1>
        {loading ? <Loading/>:error ? <Alert color="danger">{error}</Alert>:
      <Row>
        <Link to='/dashboard'> Dashboard </Link>
        <Col md={8}>
            <Card className='mb-3'>
                <CardBody>
                    <CardTitle>Shipping</CardTitle>
                    <CardText>
                       
                        <strong>Name:</strong> { orders.length!==0 && orders.shippingAddress.fullname} <br/>
                        <strong>Address:</strong>
                        {orders.length!==0 && orders.shippingAddress.address},
                        {orders.length!==0 && orders.shippingAddress.city},
                        {orders.length!==0 && orders.shippingAddress.country}  <br/>
                        <strong>Code Ship:</strong>{orders.length!==0 && orders.shippingAddress.postalCode} <br/>
                    </CardText>
                   
                </CardBody>
            </Card>
            <Card className='mb-3'>
                <CardBody>
                    <CardTitle>
                        Payment
                    </CardTitle>
                    <CardText>
                        <strong>Method:</strong> {orders.length!==0 && orders.paymentMethod}
                    </CardText>
                    
                </CardBody>
            </Card>
            <Card className='mb-3'>
                <CardBody>
                    <CardTitle>
                        Delivery
                    </CardTitle>
                    <CardText>
                        <strong>Delivery:</strong> {orders.length!==0 && (orders.isDelivered ?'Delivery by LEX VN':'Not Delivery')}
                        
                    </CardText>
                    
                </CardBody>
            </Card>
            <Card className='mb-3'>
                <CardBody>
                    <CardTitle>
                        Time
                    </CardTitle>
                    <CardText>
                        <strong>Bought:</strong> {orders.length!==0 && (format(new Date(orders.createdAt), 'dd-MM-yyyy HH ') +'h')}
                        
                    </CardText>
                    
                </CardBody>
            </Card>
            <Card className='mb-3'>
                <CardBody>
                    <CardTitle>Items</CardTitle>
                    <ListGroup>
                        {orders.length!==0 && orders.orderItems.map(item =>{
                            return <ListGroupItem key={item._id}>
                                    <Row className='align-items-center'>
                                        <Col md={6}>
                                            <img src={item.image} alt={item.name}
                                                className='img-fluid rounded img-thumbnail'
                                                style={{width:'70px',maxWidth:"70px"}}/>
                                           
                                        </Col>
                                        <Col md={3}>{item.quantity}</Col>
                                        <Col md={3}>{item.price} VNĐ</Col>
                                    </Row>
                                </ListGroupItem>
                        })}
                    </ListGroup>
                   
                </CardBody>
            </Card>
        </Col>
        <Col md={4}  id="order_right_container">
            <Card>
                <CardBody>
                    <CardTitle>Order Summary</CardTitle>
                    <ListGroup >
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>{orders.length!==0 && orders.itemsPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{orders.length!==0 && orders.shippingPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>{orders.length!==0 && orders.taxPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    <strong>Order Total</strong>
                                </Col>
                                <Col>{orders.length!==0 && orders.totalPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>
        </Col>
      </Row>
}
    </div>

  )
}

export default DetailHistoryComponent
