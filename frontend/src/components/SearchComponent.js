import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useLocation}  from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios'
import {Row,Col,Alert,Button, NavLink} from 'reactstrap'
import CancelIcon from '@mui/icons-material/Cancel';

import Rating from './Rating'
import Loading from './Loading'
import Product from './Product'
import Pagination from './Pagination'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const prices =[
    {
        name: 'Under 1.000.000 VNĐ',
        value: '10000-1000000'
    },
    {
        name: 'Under 10.000.000 VNĐ',
        value: '10000-10000000'
    },
    {
        name: '10.000.000 - 100.000.000 VNĐ',
        value: '10000000-100000000'
    },
]
 const ratingArr = [
    {
        name:'4starts & up',
        rating: 4,
    },
    {
        name:'3starts & up',
        rating: 3,
    },
    {
        name:'2starts & up',
        rating: 2,
    },
    {
        name:'1starts & up',
        rating: 1,
    },
    {
      name:'0starts & up',
      rating: 0,
  },
]

function SearchComponent() {
    const {dispatchSearch,errorSearch,setError,searchResult,} = useGlobalContext()
    // const {error,products,loading,countProducts,pages} = searchs
    const [currentPage,setCurrentPage] = useState(1)
    const [postPerPage,setPostPerPage] = useState('8')
    const [categories,setCategories] = useState([])
    const [rootData,setRootData] = useState(null)
    const [productData,setProductData] =useState(null)
    // const [errorSearchPage,setErrorSearchPage] = useState(errorSearch)
    const [category,setCategory] =useState('Any')
    const [price,setPrice] =useState('Any')
    const [rating,setRating] = useState('Any')
    const [order,setOrder] = useState('')
    const navigate = useNavigate()
    const [resetBtn,setResetBtn] = useState(false)
    const [sort, setSort] = useState('');
    

    
    // pagination 
    console.log(errorSearch)
    console.log(productData)
    const total = productData && productData.length;
    const lastIndex = currentPage *postPerPage;
    const firstIndex = lastIndex - postPerPage;
    let pagesPagin = []
    for(let i=1;i <=Math.ceil(total/postPerPage);i++){
      pagesPagin.push(i);
    }
    
    // filter 
    const handleFilterCategory = (currentCategory) =>{
      setCurrentPage(1)
      setResetBtn(true)
      setCategory(currentCategory)
      if(currentCategory === 'Any'){
        setProductData(rootData);
        return;
      }
      for(let i=0;i<categories.length;i++){
        if(categories[i] === currentCategory){
          const cate = rootData.filter(item =>item.category === currentCategory)
          setProductData(cate)
        }
      }
    }
   // price
    const handleFilterPrice = (currentPrice) =>{
      setCurrentPage(1)
      setResetBtn(true)
      setPrice(currentPrice)
      if(currentPrice === 'Any'){
        setProductData(rootData);
        return;
      }
      const result = currentPrice.split('-');

     for(let i=0;i<prices.length;i++){
      if(currentPrice === prices[i].value){
        console.log('try')
        const data = rootData.filter(item =>{
          return item.price >result[0] && item.price <result[1]
        })
        setProductData(data)
      }
     }
    }
    //rating
    const handleRating = (currentRating) =>{
      setCurrentPage(1)
      setResetBtn(true)
      setRating(currentRating)
       for(let i=0;i<ratingArr.length;i++){
        if(ratingArr[i].rating === currentRating){
          const data = rootData.filter(item => item.rating >=currentRating)
          setProductData(data)
        }
       }
    }
    //quicksort
   
    //order
    const handleOrder = (e) =>{
      setCurrentPage(1)
      setResetBtn(true)
      let orderValue = e.target.value;
      setSort(e.target.value)
      switch(orderValue){
        case 'newest':
          const coppyDataN = [...rootData];
          coppyDataN.sort((a,b)=>{
            if(a.updatedAt <b.updatedAt) return 1;
            if(a.updatedAt >b.updatedAt) return -1;
            return 0;
          });
          setProductData(coppyDataN);
          break;
        case 'lower':
          const coppyDataL =[...rootData];
          coppyDataL.sort((a,b)=>{
            if(a.price >b.price) return 1;
            if(a.price <b.price) return -1;
            return 0;
          });
          setProductData(coppyDataL);
          break;
        case 'higher':
          const coppyDataH =[...rootData];
          coppyDataH.sort((a,b)=>{
            if(a.price <b.price) return 1;
            if(a.price >b.price) return -1;
            return 0;
          });
          setProductData(coppyDataH);
          break;
        case 'avg':
          const coppyDataA =[...rootData];
          coppyDataA.sort((a,b)=>{
            if(a.rating <b.rating) return 1;
            if(a.rating >b.rating) return -1;
            return 0;
          });
          setProductData(coppyDataA);
          break;
        default:
          setProductData([]);
          return ;
      }
    }
    //handle reset 
    const handleReset = () =>{
      setCategory('Any')
      setPrice('Any')
      setRating('Any')
      setProductData(rootData)
      setResetBtn(false)
    }
  
// handle close error
    const handleCloseX = ()=>{
      setError('')
      setProductData(rootData)
    }

    useEffect(()=>{
      dispatchSearch({type:"FETCH_REQUEST"})
      axios.get(
          `${process.env.REACT_APP_API}/api/products/search`
      ).then(res =>{
          const {data} = res;
          console.log(data)
          dispatchSearch({type:"FETCH_SUCCESS",payload:data})
         setRootData(data)
         setProductData(data)
      }).catch (err=>{
          dispatchSearch({type:"FETCH_FAIL",payload:err})
      })
  }, [ ])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/api/products/catagories`)
             .then(res =>{
                const {data } =res
                setCategories(data)
             }).catch(error=>{
                console.log(error)
             })

    },[dispatchSearch])
    useEffect(()=>{

    },[])
    //search
    useEffect(()=>{
      setProductData(searchResult )
    },[searchResult])
  return (
      <Row  className='' >
        <Col md={3} className=' ' style={{minHeight:"100vh",background:"rgba(203, 186, 156, 0.33)"}}>
            <h3 className='my-3 text-dark ms-3 fw-bold'>Department</h3>
            <div >
                <ul>
                    <li >
                        <div onClick={()=>handleFilterCategory('Any')} className=' h3hover'>Any</div>
                    </li>
                    {categories.map((currentCate)=>{
                        return <li key={currentCate}>
                           <div onClick={()=>handleFilterCategory(currentCate)} className=' h3hover'>{currentCate}</div>
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <h3  className='my-3 text-dark ms-3 fw-bold'>Price</h3>
                <ul>
                    <li>
                        <div onClick={() =>handleFilterPrice("Any")}
                              className=' h3hover'
                        >Any</div>
                    </li>
                    {prices.map((p)=>{
                        return <li key={p.value}>
                                <div onClick={()=>handleFilterPrice(p.value)}
                                      className=' h3hover'
                                     >
                                      {p.name}
                                </div>
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <h3  className='my-3 text-dark ms-3 fw-bold'>Avg. Customer Review</h3>
                <ul>
                    {ratingArr.map((r)=>{
                        return <li key={r.name}>
                                <div onClick={() => handleRating(r.rating)}> <Rating caption={' & up'} rating={r.rating} /></div>
                               </li>
                    })}
                    
                </ul>
            </div>
        </Col>
        <Col md={9} className=''>
            <Row  className="justify-content-between mb-3">
              <Col md={6} sm={6}>
               {resetBtn &&  <div style={{marginLeft:'1rem'}} >
                  {productData && productData.length === 0 ? 'No' : productData && productData.length } Results
                  {category !=='Any'&& ' : '+ category}
                  {price !=="Any" && " : " +price}
                  {rating !=="Any" && " : "+ rating +'star'} 
                  {productData.legnth !== 0 ?
                  <button className='bg-light text-dark border-0 my-3 m-3'  onClick={handleReset}>
                    <i className="fas fa-times-circle"></i>
                  </button>: null}
                  </div>}
              </Col>
              <Col className="text-end d-flex justify-content-center align-items-center " md={3} sm={3} style={{minWidth:"300px",marginRight:"1rem"}}>
                  {/* Sort by{' '}
                  <select className='my-3'
                    onChange={handleOrder}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lower">Price: Low to High</option>
                    <option  value="higher">Price: High to Low</option>
                    <option value="avg">Avg. Customer Reviews</option>
                  </select> */}
                  <div className='sort_container w-100 mt-3'>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select  
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sort}
                      label="Sort "
                      onChange={handleOrder}
                    
                    >
                      <MenuItem  value="newest">Newest Arrivals</MenuItem>
                      <MenuItem value="lower">Price: Low to High</MenuItem>
                      <MenuItem value="higher">Price: High to Low</MenuItem>
                      <MenuItem value="avg">Avg. Customer Reviews</MenuItem>
                    </Select>
                  </FormControl>
                  </div>
                 
                
              </Col>
           
            </Row>
            <Row className='p-3'>
              <Col md={12} sm={12}>
              <h1 className='text-center'><span style={{color:"#cbba9c"}}>Featured</span> Products</h1>
                {/* {loading ?<Loading/>:(error  ?<div>{error}</div>: */}
               <Row  className='mt-3'>
                  {/* { errorSearch ?<Alert color='danger'>{errorSearch}</Alert>:productFilter.length !==0 ?
                   productFilter.slice(firstIndex,lastIndex).map(product =>{
                    return <Product key={product._id} {...product}/>
                  }):searchProduct.slice(firstIndex,lastIndex).map(product=>{
                    return <Product  key={product._id} {...product}/>
                  })} */}
                    { errorSearch ?
                    <Alert color='danger' className='p-0 d-flex justify-content-between'>
                      <span className='ms-3'>{errorSearch}</span> <button onClick={handleCloseX} className='admin_cancel me-1'>
                      <CancelIcon className='text-danger fs-7 '/>
                      </button>

                    </Alert>:
                   productData && productData.slice(firstIndex,lastIndex).map(product =>{
                    return <Product key={product._id} {...product}/>
                  })}
                 <nav aria-label="Page navigation example">
                  <ul class="pagination">
                      <li class="page-item"><a class="page-link" href="#">Previous</a></li>

                          {pagesPagin.map(page =>{
                              return <li class="page-item"><a class="page-link" onClick={() =>setCurrentPage(page)}>{page}</a></li>
                          })}
                      <li class="page-item"><a class="page-link" href="#">Next</a></li>
                  </ul>
                  </nav>
              </Row>
              {/* )} */}
              </Col>
                
            </Row>
      
        </Col>
      </Row>
 
  )
}

export default SearchComponent
