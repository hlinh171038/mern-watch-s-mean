import React from 'react'
import { useGlobalContext } from '../context'
import {Link, useNavigate} from 'react-router-dom'
import { ListGroup, ListGroupItem ,Col,Row,Button, CardBody,Card, Container} from 'reactstrap'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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
  return <div>
           {carts.cart.length === 0? (
                  <div style={{height:"500px",minHeight:'500px'}}>
                    <div className="about_container_img bg-image">
                        <img src ="https://images.pexels.com/photos/859895/pexels-photo-859895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        className='w-100 h-100 img-fluid shadow-2-strong hover-shadow'/>
                        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='d-flex justify-content-center flex-column align-items-center'>
                                <p className='text-white mb-0 text-uppercase fs-4 fw-bold'>carts</p>
                                <p className='text-white mb-0 text-uppercase mt-3'>Home Page / <strong style={{color:"#cbba9c"}}>carts</strong></p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='color-light fw-5 text-center mt-5 ' style={{marginBottom:"7rem"}}>Cart is empty. 
                      <Link to="/">Home Pages</Link>
                    </div>
                  </div>
                ):(
        <div >
          <div className="about_container_img bg-image">
              <img src ="https://images.pexels.com/photos/859895/pexels-photo-859895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
               className='w-100 h-100 img-fluid shadow-2-strong hover-shadow'/>
               <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                  <div className='d-flex justify-content-center align-items-center h-100'>
                   <div className='d-flex justify-content-center flex-column align-items-center'>
                      <p className='text-white mb-0 text-uppercase fs-4 fw-bold'>carts</p>
                      <p className='text-white mb-0 text-uppercase mt-3'>Home Page / <strong style={{color:"#cbba9c"}}>carts</strong></p>
                   </div>
                   </div>
               </div>
          </div>
          <div className='container mb-5 mt-3 ' style={{height:"auto",minHeight:"500px"}}>
            <Row className='mt-3'>
                <Col md={8}>
                    <ListGroup className='mb-3'>
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
                              <Col sm={4} md={3}>{item.price && item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</Col>
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
                  
                  <Link to="/search" className='text-capitalize text-decoration-none text-light nav_search_btn small '> <KeyboardBackspaceIcon/> coutinue shopping</Link>
                </Col>
                <Col md={4} id='cart_right_container'>
                  <Card>
                    <CardBody className='text-center'>
                            <h4>
                              Subtotal ({carts.cart.reduce((cal,item)=>cal+item.quantity,0)} items) :
                              {carts.cart.reduce((cal,item)=> cal+item.price * item.quantity,0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
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
          </div>
            
        </div>

           )}
         </div>

    
}

export default CartComponent
