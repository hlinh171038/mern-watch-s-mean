import React from 'react'
import { useGlobalContext } from '../context'
import {Link, useNavigate} from 'react-router-dom'
import { ListGroup, ListGroupItem ,Col,Row,Button, CardBody,Card, Container} from 'reactstrap'


function CartComponent() {
    const {carts,dispatchCart} = useGlobalContext()
    const navigate = useNavigate()

    // update amount 
    const updateAmountCard = async(item,quantity) =>{
      const response = await fetch(`${process.env.REACT_APP_API}/api/product/${item._id}`)
      const data = await response.json()
      if(data.countInStock < quantity){
        window.alert('quantity is out of stock')
        return 
      }
      dispatchCart({type:"ADD_TO_CART",payload:{...data,quantity}})
    }
    // delete card item
    const deleteItem = async(item )=>{
      const response = await fetch(`${process.env.REACT_APP_API}/api/product/${item._id}`)
      const data = await response.json()
      dispatchCart({type:'DELETE_ITEM',payload:data})
    }
    // chek out handler
    const checkoutHandler = () =>{
      navigate('/signin?redirect=/shipping')
    }
  return <div className='container mb-5 mt-3 ' style={{height:"auto",minHeight:"500px"}}>
             <div className='text-center mt-3'><h1 ><span className='' style={{color:"#685f52"}}>Shopping</span> Cart</h1></div>
             {carts.cart.length === 0? (
                  <div className='color-light fw-5 text-center mt-5 ' style={{marginBottom:"7rem"}}>Cart is empty. <Link to="/" className=' text-light text-decoration-none   rounded-pill ' style={{padding:".5rem 1rem",background:"#685f52"}}>Home Pages</Link></div>
                ):(
            <Row>
              <Col md={8}>
                  <ListGroup>
                    {carts.cart.map(item=>{
                      return <ListGroupItem key={item._id} >
                          <Row className=" card_row_container">
                            <Col  sm ={12} md={4} className='card_img_container d-flex align-items-center '>
                              <img
                                src={`${process.env.REACT_APP_API}/`+item.image}
                                alt={item.name}
                                className='img-fluid rounded img-thumbnail w-25'
                                />
                              <Link to={`/product/${item.slug}`} className='text-decoration-none text-muted small m-3'>{item.name}</Link>
                            </Col>
                            <Col sm={4} md={3}  className=''  style={{minWidth:"177px"}}>
                              <Container className='w-100'>
                                <Button className='bg-light border-0 text-secondary' 
                                        disabled={ item.quantity === 1}
                                        onClick={()=>updateAmountCard(item, item.quantity-1)}>
                                  <i class="fa-solid fa-circle-minus"></i>
                                </Button>
                                <span className='p-3'>{item.quantity}</span>
                                <Button className='bg-light border-0 text-secondary' 
                                        disabled={item.quantity === item.countInStock}
                                        onClick={()=>updateAmountCard(item,item.quantity+1)}>
                                  <i class="fa-solid fa-circle-plus"></i>
                                </Button>
                              </Container>
                            </Col>
                            <Col sm={4} md={3}>{item.price}</Col>
                            <Col sm={4} md={2} className='text-center'>
                              <Button  className='text-danger bg-light border-0'
                                       onClick={()=>deleteItem(item)}>
                                <i className='fas fa-trash'></i>
                              </Button>
                            </Col>
                          </Row>
                      </ListGroupItem>
                    })}
                  </ListGroup>
                
              </Col>
              <Col md={4} id='cart_right_container'>
                <Card>
                  <CardBody className='text-center'>
                          <h4>
                            Subtotal ({carts.cart.reduce((cal,item)=>cal+item.quantity,0)} items) :
                            {carts.cart.reduce((cal,item)=> cal+item.price * item.quantity,0)} VND
                          </h4>
                          <hr/>
                          {/* <Button 
                            type="button"
                            disabled = {carts.cart.length === 0}
                            className='button__gold w-100'
                            onClick={checkoutHandler}
                            >
                              Proceed to Checkout
                            </Button> */}
                            <button className='nav_search_btn w-100'
                                    type="button"
                                    disabled = {carts.cart.length === 0}
                                    onClick={checkoutHandler}
                                    >
                              <span>Proceed to Checkout</span>
                            </button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            )}
        </div>

    
}

export default CartComponent
