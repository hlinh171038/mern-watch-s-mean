import React, { useEffect } from 'react'
import CheckoutStep from './CheckoutStep'
import { Button, Card, CardBody, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { useGlobalContext } from '../context'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'


function PlaceOrderCompponent() {
    const {carts,dispatchOrder,dispatchCart,orders} = useGlobalContext()
    const{userInfo, shippingAddress,paymentMethod,cart} = carts
    const navigate = useNavigate()

    const round2 = (num) => Math.round(num*100 + Number.EPSILON)/100; // 123.45657 ==> 123.45
    // itemPrice
    carts.itemsPrice = round2(
        cart.reduce((cal,item)=> cal + item.quantity * item.price,0)
    );
    //shippingPrice
    carts.shippingPrice = carts.itemsPrice >100 ? round2(0) : round2(100)
    // taxPrice
    carts.taxPrice = round2(0.15 * carts.itemsPrice)
    // totalPrice
    carts.totalPrice = carts.itemsPrice +carts.shippingPrice+ carts.taxPrice;

const placeOrderHandler = ()=>{
   
        dispatchOrder({type:"CREATE_REQUEST"})
        axios.post(`${process.env.REACT_APP_API}/api/orders`,{
            orderItems:cart,
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod,
            itemsPrice:carts.itemsPrice,
            shippingPrice:carts.shippingPrice,
            taxPrice:carts.taxPrice,
            totalPrice:carts.totalPrice
        },{
            headers:{
                authorization: `Bearer ${userInfo.token}`
            }
        }).then(res =>{
            console.log(res.data)
            const {data} = res
            dispatchCart({type:"CART_CLEAR"});
            dispatchOrder({type:"CREATE_SUCCESS"})
            localStorage.removeItem('cart');
            navigate(`order/${data._id}`)
        })
        .catch (error =>{
            dispatchOrder({type:"CREATE_FAIL"})
        }) 
}
useEffect(()=>{
    if(!paymentMethod){
        navigate('/payment')
    }
},[paymentMethod,navigate])
  return (
    <div className='container'>
      <CheckoutStep step1 step2 step3 step4/>
      <h1 className="my-3 text-center mb-5"> <span style={{color:"#cbba9c"}}>Preview</span> Order </h1>
      <Row>
        <Col md={8}>
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
                    <Link to="/shipping">Edit</Link>
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
                    <Link to="/payment">Edit</Link>
                </CardBody>
            </Card>
            <Card className='mb-3'>
                <CardBody>
                    <CardTitle>Items</CardTitle>
                    <ListGroup>
                        {cart.map(item =>{
                            return <ListGroupItem key={item._id}>
                                    <Row className='align-items-center'>
                                        <Col md={6}>
                                            <img src={`${process.env.REACT_APP_API}/`+item.image} alt={item.name}
                                                className=' place_order_img img-fluid rounded img-thumbnail'
                                                />
                                            <Link to={`/product/${item.slug}`}
                                                    className='text-decoration-none text-muted small m-3'>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={3}>{item.quantity}</Col>
                                        <Col md={3}>{item.price} VNĐ</Col>
                                    </Row>
                                </ListGroupItem>
                        })}
                    </ListGroup>
                    <Link to="/cart">Edit</Link>
                </CardBody>
            </Card>
        </Col>
        <Col md={4} id="order_right_container">
            <Card>
                <CardBody>
                    <CardTitle>Order Summary</CardTitle>
                    <ListGroup >
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>{carts.itemsPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{carts.shippingPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>{carts.taxPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    <strong>Order Total</strong>
                                </Col>
                                <Col>{carts.totalPrice} VNĐ</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem >
                           <div className='d-grid mb-3'>
                            <button
                                type="button"
                                className='nav_search_btn'
                                onClick={placeOrderHandler}
                                disabled = {carts.length ===0}
                            >Place Order</button>
                           </div>
                           {orders.loading && <Loading/>}
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderCompponent
