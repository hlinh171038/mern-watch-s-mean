import React, { useEffect } from 'react'
import Loading from './Loading'
import { useGlobalContext } from '../context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Alert, Card, CardBody, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row } from 'reactstrap'

function OrderDetailComponent() {
    const {dispatchOrder,orders,carts} = useGlobalContext()
    const {id} = useParams()
    const navigate = useNavigate()
    const {error,loading,order,isDelivered} = orders
    const {shippingAddress,paymentMethod,cart} = carts
    console.log(order)
    useEffect(()=>{
        dispatchOrder({type:"FETCH_REQUEST"})
        axios.get(`${process.env.REACT_APP_API}/api/orders/${id}`).then(res=>{
            console.log(res.data)
            const {data} = res
            dispatchOrder({type:"FETCH_SUCCESS",payload:data})

        }).catch(error =>{
            console.log(error)
            dispatchOrder({type:"FETCH_FAIL"})

        })
    },[])
    useEffect(()=>{
        if(!carts.userInfo){
            navigate('/signin')
        }
    },[navigate,carts.userInfo])
  return (
    loading ? 
    <Loading/>
    : (error ? <div className='bg-danger'>{error}</div>:
        <div className='container'>
            <h1 className='my-3 text-center'>ORDER - {id}</h1>
            <span className='mt-1 mb-3'>Your Product is bought, see<Link to="/orderhistory"> Order History</Link></span>
            <Row md={8}>
                <Col md={12}>
                    <Card className='mb-3'>
                        <CardBody>
                            <CardTitle>Shipping</CardTitle>
                            <CardText>
                            <strong>Name:</strong> {shippingAddress.fullname} <br/>
                            <strong>Address:</strong>
                            {shippingAddress.address},
                            {shippingAddress.city},
                            {shippingAddress.country}  <br/>
                            <strong>Code Ship:</strong>{shippingAddress.postalCode} <br/>
                            </CardText>
                            {isDelivered ? (<Alert color='success'>Deliverd at </Alert>)
                                          :  <Alert color='danger'>Not Deliverd  </Alert>}
                        </CardBody>
                    </Card>
                    <Card className='mb-3'>
                        <CardBody>
                            <CardTitle>
                                Payment
                            </CardTitle>
                            <CardText>
                                <strong>Method:</strong> {paymentMethod}
                            </CardText>
                            {isDelivered ? (<Alert color='success'>Paid at </Alert>)
                                          :  <Alert color='danger'>Not Paid </Alert>}
                        </CardBody>
                    </Card>
                    <Card className='mb-3'>
                        <CardBody>
                            <CardTitle>Items</CardTitle>
                            <ListGroup>
                                {order.orderItems && order.orderItems.map(item =>{
                                    return <ListGroupItem key={item._id}>
                                            <Row className='align-items-center'>
                                                <Col md={6}>
                                                    <img src={`${process.env.REACT_APP_API}/`+item.image} alt={item.name}
                                                        className=' place_order_img img-fluid rounded img-thumbnail'
                                                        />
                                                    <span>{item.name}</span>
                                                   </Col>
                                                <Col md={3}>{item.quantity}</Col>
                                                <Col md={3}>{item.price} VNĐ</Col>
                                            </Row>
                                        </ListGroupItem>
                                })}
                            </ListGroup>
                        </CardBody>
                    </Card>
                    <Card >
                <CardBody>
                    <CardTitle>Order Summary</CardTitle>
                    <ListGroup >
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>{order.itemsPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{order.shippingPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>{order.taxPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    <strong>Order Total</strong>
                                </Col>
                                <Col>{order.totalPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>
                </Col>
            </Row>
        </div>)
  )
}

export default OrderDetailComponent
