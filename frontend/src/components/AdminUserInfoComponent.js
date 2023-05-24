import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Col, Container, Row } from 'reactstrap';
import { useGlobalContext } from '../context';
import { compareAsc, format } from 'date-fns'
import { Link, NavLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function AdminUserInfoComponent() {
    const [userInfo,setUserInfo] = useState([])
    const [order,setOrder] = useState([])
    const[orderClone,setOrderClone] = useState([])
    const {carts} = useGlobalContext()
    const [text,setText] =useState('')
    const [closeX,setCloseX] =useState(false)
    const [error,setError] =useState(false)
    const textRef = useRef()
    const [numPerPage,setNumPerPage] = useState(8)
    const [currentPage,setCurrentPage] =useState(1)

    const lastPage = numPerPage * currentPage;
    const firstPage = lastPage - numPerPage;

    const [sort, setSort] = useState('');
   
    // pagination 
    let pagin = []
    for(let i=0;i<Math.ceil(orderClone.length/numPerPage) ;i++){
        pagin.push(i)
    }

    //handle pagination
    const handlePagination =(e,p)=>{
      console.log(e,p)
      setCurrentPage(p)
    }

    //search 
    const handleSearch =(e) =>{
      e.preventDefault();
      setCloseX(false)
      setError(false)
      let tape = textRef.current.value
      const userTape = [...userInfo].filter(item =>{
       return item.name.toLowerCase().includes(tape)  || item.email.toLowerCase().includes(tape)
      } )
      console.log(order)
    
      if(userTape.length !== 0){
        const result = [...order].filter(item =>{
           return item.user === userTape[0]._id
         })
         console.log(result)
         setOrderClone(result)
         setCloseX(true)
         setText('')
         setError(false)
      }else{
        console.log('error')
        setCloseX(false)
        setText('')
        setError(true)
      }
    }

    // handle all
    const handleAll = () =>{
      setOrderClone(order)
      setCloseX(false)
      setError(false)
    }
    // handle error
    const handleError = () =>{
      setError(false)
    }

    //display user in the screen
    const userScreen = (id) =>{
        console.log(id)
       let result = userInfo.find(user =>{                              
            return user._id === id
         });
        //  console.log(result)
         return result;
         
    }
    // -----------------------sort----------------------------------------------------------
    // sort
    const handleChange = (event) => {
      setSort(event.target.value);
     let  item =event.target.value;
     switch(item){
      case 'oldest':
        const last = [...order].sort((a,b)=>{
          if(a.createdAt > b.createdAt) return 1;
          if(a.createdAt < b.createdAt) return -1;
          return 0;
        })
        setOrderClone(last);
        break;
      case 'lastest':
        const old = [...order].sort((a,b)=>{
          if(a.createdAt < b.createdAt) return 1;
          if(a.createdAt > b.createdAt) return -1;
          return 0;
        })
        setOrderClone(old);
        break;
        default:
         setOrderClone([]);return;
     }
    };

    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'/api/orders',
       )
             .then(res =>{
                const {data } = res;
                console.log(data)
                setOrder(data)
                setOrderClone(data)
             })
             .catch(err =>{
                console.log(err)
             });
    },[])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'/api/users')
              .then(res =>{
                const {data } =res;
              
                setUserInfo(data)
              })
              .catch(err =>{
                console.log(err)
              })
    },[])
  return (
      <Row className='admin_userInfo_row  p-3'>
        <Col md={12} className='d-flex justify-content-between align-items-center mt-3 mb-5'>
          <div className='admin_search_container d-flex jsutify-content-center'>
              <form onSubmit={handleSearch} className='d-flex'>
                <input type='text'
                        className='nav_search_input'
                        value={text}
                        onChange={(e) =>setText(e.target.value)}
                        placeholder='Search user or email'
                        ref={textRef}/>
              <button  type="submit"  className='nav_search_btn'>Search</button>
              </form>
              <div className='ms-5'>{closeX &&  
                  <span>
                    {orderClone.length} user is find <button onClick={handleAll} className='admin_cancel'><CancelIcon className='text-danger fs-7 '/></button>
                  </span>}
              </div>
          </div>
          <div className='admin_sort_container ' >
          <select
             className='search_select comment_form_control'
              value={sort}
             onChange={handleChange}
           >
            <option value="lastest">Latest Day </option>
            <option value="oldest">Oldest Day</option>  
           </select>
          </div>
        </Col>
        <Col sm={12} md={12} lg={12}  style={{height:"auto",minHeight:"400px"}}>
          {error && <Alert color="danger" className='p-0 d-flex justify-content-between'>
                      <span className='ms-5'>User Or Email Not Found</span> <button onClick={handleError} className='admin_cancel me-1'>
                        <CancelIcon className='text-danger fs-7 '/>
                    </button>
                    </Alert>}
           <table className='w-100 '>
                <tr>
                        <th className='text-center'>USER</th>
                        <th  className='text-center'>DATE</th>
                        <th  className='text-center'>PRODUCT-QUANTITY</th>
                        <th  className='text-center'>TOTAL</th>
                        <th  className='text-center'>ADDRESS</th>
                        <th  className='text-center'>ACTION</th>
                </tr>
               { orderClone && orderClone.slice(firstPage,lastPage).map(item =>{
                return  <tr>
                            <td  className='text-center'>{ userScreen(item.user) &&  userScreen(item.user).name}</td>
                            <td  className='text-center'>{ format(new Date(item.createdAt), 'dd-MM-yyyy HH-mm-ss')}</td>
                            <td className='text-center'>{item.orderItems.length}</td>
                            <td  className='text-center'>{item.totalPrice && item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                            <td  className='text-center'>{item.shippingAddress.address},{item.shippingAddress.city}</td>
                            <td  className='text-center pt-3 pb-3'>
                                <Link  to={`/dashboard/${item._id}`} className='text-decoration-none text-light nav_search_btn ' >                                   
                                  Detail
                                </Link> 
                            </td>
                        </tr>
               })}
             
           </table>
          
        </Col>
          <Stack spacing={2} className="mt-3 mb-3">
            <Pagination count={pagin.length} variant="outlined" shape="rounded"  onChange={handlePagination}/>
          </Stack>
    </Row>
    
  )
}

export default AdminUserInfoComponent
