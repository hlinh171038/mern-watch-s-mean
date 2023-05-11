import React,{useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useGlobalContext } from '../context';
import {Row,Col, ListGroup, ListGroupItem, CardBody, Badge,Button, Container} from 'reactstrap'
import Rating from './Rating';
import Loading from './Loading';
function ProductDetails() {
  const {state,dispatch,carts,dispatchCart} = useGlobalContext()
  const {loading,product,error} = state
  const params = useParams()
  const {slug} =params
  const navigate = useNavigate()
    // add to cart detail
    const addToCartDetail = async()=>{
      //check item have existed in cart
      let exsistItem = carts.cart.find(x =>x._id === product._id)
      let quantity = exsistItem? exsistItem.quantity +1 : 1
      const response = await fetch(`${process.env.REACT_APP_API}/api/product/${product._id}`)
      const result = await response.json()
      if(result.countInStock<quantity){
        window.alert('quantity is out of stock');
        return
      }
      dispatchCart({type:"ADD_TO_CART",payload:{...result,quantity}})
      navigate('/cart')
      console.log(product._id,result)
    }
     // product detail
     useEffect(()=>{
      const fetchDataDetail = async ()=>{
        dispatch({type:"FETCH_REQUEST_DETAIL",})
        try {
          const response = await fetch(`${process.env.REACT_APP_API}/api/product/slug/${slug}`)
          const result = await response.json()
          console.log(result)
          dispatch({type:"FETCH_SUCCESS_DETAIL",payload:result})
        } catch (error) { 
          console.log('try')
          dispatch({type:"FETCH_ERROR_DETAIL",payload:error.message})
        }
      }
      fetchDataDetail()
     },[slug])
     console.log(product.name)
  return !loading ?
  <Loading className='text-center'/>:
          error ? 
  <div className='text-center text-light bg-danger'>{error}</div>:
  <Container className=' mt-3 mb-3'>
    <Row>
      <Col md={6} id="product_detail_img_cintainer">
        <img className='img-large w-100 mb-3' src={`${process.env.REACT_APP_API}/`+product.image} alt={product.name}/>
      </Col>
      <Col md={3} id="product_detail_description_container">
        <ListGroup variant="flush">
           <ListGroupItem>
            <h1 className=''>{product.name}</h1>
           </ListGroupItem>
           <ListGroupItem>
              <Rating rating={product.rating} numReviewer ={product.numReviewer}/>
           </ListGroupItem>
           <ListGroupItem>
              Price: {product.price}
           </ListGroupItem>
           <ListGroupItem>
              Description: 
              <p>{product.description}</p>
           </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={3} id="product_detail_price_container">
        <CardBody>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Row>
                <Col>Price:</Col>
                <Col>{product.price}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col>{product.countInStock>0 ?
                      <Badge className='bg-success'>In Stock</Badge>:
                      <Badge className='bg-danger'>Unavailable</Badge>}</Col>
              </Row>
            </ListGroupItem>
            {product.countInStock >0 &&
              <ListGroupItem>
                <div className='d-grid'>
                  {/* <Button style={{background:'darkgoldenrod',border:"none"}} onClick={addToCartDetail}>Add to cart</Button> */}
                  <button className='btn_all_web' onClick={addToCartDetail}>
                      <span>Add to cart</span>
                  </button>
                </div>
              </ListGroupItem>}
          </ListGroup>
        </CardBody>
      </Col>
    </Row>
  </Container>

}

export default ProductDetails
