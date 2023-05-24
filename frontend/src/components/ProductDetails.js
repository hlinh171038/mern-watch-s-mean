import React,{useEffect, useState} from 'react'
import {Link, NavLink, useNavigate, useParams} from 'react-router-dom'
import { useGlobalContext } from '../context';
import {Row,Col, ListGroup, ListGroupItem, CardBody, Badge,Button, Container, CardTitle, Card, CardText, TabPane, TabContent, NavItem, Nav} from 'reactstrap'
import Rating from './Rating';
import Loading from './Loading';
import ReactImageMagnify from 'react-image-magnify';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CommentComponent from './CommentComponent';
import RelativeProductComponent from './RelativeProductComponent'

const section =  ['description','comment']
function ProductDetails() {
  const {state,dispatch,carts,dispatchCart} = useGlobalContext()
  const {loading,product,error} = state
  const [detailQuantity,setDetailQuantity] = useState(1)
   const [displayDes,setDisplayDes] = useState(true)
   const [displayCom,setDisplayCom] = useState(false)
   const [active,setActive] =useState(false)
  
  const params = useParams()
  const {slug} =params
  const navigate = useNavigate()

  // convert price
  let cn = product.price
  let num = product.price;
  let priceConverse = num && num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  

  // handle display comment
 
  
 
  const handleDisplay =(e)=>{
   // handle content
    if(e.target.id ==='description'){
      setDisplayDes(true)
      setDisplayCom(false)
    }else{
      setDisplayDes(false)
      setDisplayCom(true)
    }
    //handle button
    
    for(let i=0;i<section.length;i++){
      let input = section[i]
      document.getElementById(`${input}`).classList.remove('action_button')
    }
    let item = e.target
    console.log(e.target.id)
   item.classList.add('action_button')  
  }
 
    // add to cart detail
    
    const addToCartDetail = async() =>{
        // caheck item is exist in carts
        let existItem = carts.cart.find(x =>x._id === product._id)
        let quantity = existItem ? existItem.quantity + detailQuantity: detailQuantity
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

// update amount cart 
    const deceaseQuantity = () =>{
      setDetailQuantity(detailQuantity -1)
    }
    const increaseQuantity = () =>{
      setDetailQuantity(detailQuantity +1)
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
    <h5 className='mb-3'><Link to="/" className='text-decoration-none text-dark'>Home</Link> / <span style={{color:"#cbba9c"}}>Detail</span> </h5>
    <Row>
      <Col lg={6} id="product_detail_img_cintainer">
      <ReactImageMagnify {...{
          smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: `${process.env.REACT_APP_API}/`+product.image
          },
          largeImage: {
              src:  `${process.env.REACT_APP_API}/`+product.image,
              width: 1000,
              height: 1100
          },
          enlargedImagePosition:'over',
          isHintEnabled:true,
      }} />
        {/* <img className='product_detail_img ' src={`${process.env.REACT_APP_API}/`+product.image} alt={product.name}/> */}
      </Col>
      <Col lg={6} id="product_detail_description_container">
        <ListGroup >
           <ListGroupItem>
            
            <h1 className='text-capitalize'>{product.name}</h1>
           </ListGroupItem>
           <ListGroupItem>
              <Rating rating={product.rating} numReviewer ={product.numReviewer}/>
           </ListGroupItem>
           <ListGroupItem>
           
              Price: {priceConverse && priceConverse} VNĐ
           </ListGroupItem>
           <ListGroupItem>
            <div className='text-capitalize text-muted'><ArrowRightIcon/> Genuine imported product</div>
            <div  className='text-capitalize text-muted'><ArrowRightIcon/> free ship in the nationawide</div>
            <div  className='text-capitalize text-muted'><ArrowRightIcon/> instant delivery</div>
            <div  className='text-capitalize text-muted'><ArrowRightIcon/> payment after recive products</div>
            <div  className='text-capitalize text-muted'><ArrowRightIcon/> 5 years warranty</div>
            <div  className='text-capitalize text-muted'><ArrowRightIcon/> call <strong>1800 0091</strong> or <strong>0772981024</strong> to order, any question</div>
              {/* Description: 
              <p>{product.description}</p> */}
           </ListGroupItem>
           <ListGroupItem>
              <Row>  
                <Col><span className='me-3'>Status:</span>{product.countInStock>0 ?
                      <Badge className='bg-success' style={{padding:"0.5rem 1rem"}}>In Stock</Badge>:
                      <Badge className='bg-danger'>Unavailable</Badge>}</Col>
              </Row>
            </ListGroupItem>
           <ListGroupItem className=''>
              <Row>
                <Col md={3} sm={6} className='d-flex justify-content-center align-items-center mb-3 mb-lg-0 '>
                    <div className='detail_button_cover'>
                    <Button className='bg-light border-0 text-secondary' 
                             disabled={ detailQuantity === 1}
                            onClick={()=>deceaseQuantity(product)}
                             >
                       <i class="fa-solid fa-circle-minus"></i>
                    </Button>
                    <span className='p-3'>{detailQuantity}</span>
                     <Button className='bg-light border-0 text-secondary' 
                             disabled={detailQuantity === product.countInStock}
                            onClick={()=>increaseQuantity(product)}
                             >
                       <i class="fa-solid fa-circle-plus"></i>
                    </Button>
                    </div>
                  
                </Col>
                <Col md={4} sm={6} className='d-flex align-items-center text-sm-center justify-content-center'>
                  
                     {/* <Button style={{background:'darkgoldenrod',border:"none"}} onClick={addToCartDetail}>Add to cart</Button> */}
                    <button className='nav_search_btn' onClick={addToCartDetail}>
                        <span>Add to cart</span>
                    </button>
                  
                </Col>
              </Row>              
                              
            </ListGroupItem>
              <ListGroupItem>
              <div className='text-dark'>Tag: <span className='text-muted small'>{product._id}</span></div>
              <div className=''>Catagory: <span className='text-muted small'>{product.category}</span> </div>
           </ListGroupItem>
        </ListGroup>
      </Col>
     
    </Row>
    <Row>
      <hr/>
      <Col md={12} >
        <div>
          {section.map(item =>{
            return <button id={item} onClick={handleDisplay}>{item}</button>
          })}
          
        </div>
        <div className={!displayDes ? 'description_container action_display':'description_container'}>
          <Row>
            <Col md={6}>
              <Container className='mt-5 mb-5'>
                <h5 className='text-uppercase '>origin and parameters</h5>
                <div className='description_table'>
                  <tr className='d-flex justify-content-between ' >
                    <td>Brand</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr className='d-flex justify-content-between'>
                    <td>Product Code</td>
                    <td>{product._id}</td>
                  </tr>
                  <tr className='d-flex justify-content-between'>
                    <td>Gender</td>
                    <td>Male</td>
                  </tr>
                  <tr className='d-flex justify-content-between'>
                    <td>Product's Type</td>
                    <td>Automatic</td>
                  </tr>
                  <tr className='d-flex justify-content-between'>
                    <td>Material</td>
                    <td>stainless steel</td>
                  </tr>
                  <tr className='d-flex justify-content-between'>
                    <td>Water resistant</td>
                    <td>3 ATM</td>
                  </tr>
                  <tr className='d-flex justify-content-between'>
                    <td>Warranty</td>
                    <td>24 month</td>
                  </tr>
                </div>
              </Container>
            </Col>
            <Col md={6}>
              <h5 className='mt-5 mb-3 text-uppercase'>Description</h5>
              <span>{product.description}</span>
            </Col>
          </Row>
         
        </div>
        <div className={!displayCom ? 'comment_container action_display':'comment_container'}>
          <CommentComponent {...product}/>
        </div>
      </Col>
    </Row>
    <RelativeProductComponent {...product}/>
  </Container>

}

export default ProductDetails
