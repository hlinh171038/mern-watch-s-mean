import React from 'react'
import {Button, Card, Col,CardTitle,CardBody,CardText} from 'reactstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'
import { useGlobalContext } from '../context'

function Product({...product}) {
const {addToCart,state} =useGlobalContext()

  return (
    <Col sm={6} md={4} lg={3} className=' mb-5 mt-5 '  id ="product_item_container" key={product.slug} >
        <Card key={product.slug} className='product_hover'>
            <Link to={`/product/${product.slug}`}>
                <img src={`${process.env.REACT_APP_API}/`+product.image} alt={product.name} className='product__img' />
            </Link>
            <CardBody>
                <Link to={`/product/${product.slug}`}>
                    <CardTitle className='text-capitalize'>{product.name.length >15 ? product.name.substring(0,15)+'...':product.name}</CardTitle>
                </Link>
                <Rating rating={product.rating} numReviewer = {product.numReviews}/>
                <CardText>
                    {product.price && product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
                </CardText>
                {product.countInStock === 0 ? 
                <Button className= '  bg-light text-muted small border-0 ' style={{padding: "6px 28px"}} disabled={true}>Out Of Stock</Button>:
                // <Button className='p-1 text-light  border-0' style={{'backgroundColor':'darkgoldenrod'}} onClick={()=>addToCart(product._id)}>Add to cart</Button>
                <div className='btn_all_web' onClick={()=>addToCart(product._id)}>
                                <span>Add to cart</span>
                            </div>
                }
            </CardBody>
        </Card>
    </Col>
  )
}

export default Product
