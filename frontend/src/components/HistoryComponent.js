import React, { useEffect, useRef, useState } from 'react'
import Loading from './Loading'
import { Alert, Button, Col, Row } from 'reactstrap'
import { useGlobalContext } from '../context'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function HistoryComponent() {
    const {carts,historys,dispatchHistory} = useGlobalContext()
    const {userInfo} = carts
    const navigate = useNavigate()
    const {error,loading,orderHistory} = historys
    const [historyData,setHistoryData] = useState(null)
    const [loadingPage,setLoadingPage] = useState(true)
    const [lengthData,setLengthData] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [countPerPage,setCountPerPage] = useState(8)
    const [isPagin,setIsPagin] = useState(false)
    const paginRef = useRef()
    // calculate pagination (need start page, end page)
        let startPage = countPerPage * currentPage - countPerPage;
        let endPage = countPerPage * currentPage;
        // function to change each times they click
        
        const handlePagination =(e,p)=>{
          console.log(e,p)
          setCurrentPage(p)
        }
        // pagination show
        let paginShow = []

        for (let i=0;i<Math.ceil(lengthData/countPerPage);i++){
          paginShow.push(i)
        }

    useEffect(()=>{
      setLoadingPage(true)
        dispatchHistory({type:"FECTCH_REQUEST"})
        axios.get(`${process.env.REACT_APP_API}/api/orders/history`,
                    {headers:{authorization: `Bearer ${userInfo.token}`}})
            .then(res =>{
                const {data } =res;
                console.log(data)
                setHistoryData(data)
                setLengthData(data.length)
                setLoadingPage(false)
                dispatchHistory({type:"FETCH_SUCCESS",payload:data})
            })
            .catch(error =>{
                console.log(error)
                dispatchHistory({type:"FETCH_FAIL",payload:error})
                setLoadingPage(true)
            })
    },[])
  return (
    <Row className='  mb-5'>
      {!historyData ?<div  style={{height:'400px',minHeight:"400px"}}>
            <div className="about_container_img bg-image">
            <img src ="https://images.pexels.com/photos/859895/pexels-photo-859895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            className='w-100 h-100 img-fluid shadow-2-strong hover-shadow'/>
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <p className='text-white mb-0 text-uppercase fs-4 fw-bold'>history</p>
                    <p className='text-white mb-0 text-uppercase mt-3'>Home Page / <strong style={{color:"#cbba9c"}}>history</strong></p>
                </div>
                </div>
            </div>
            <div className='text-center text-capitalize text-secondary' >
                you have no order history turn back to <Link to='/'>Home</Link>
             </div>
            </div>
        </div>:
              loadingPage ? (
                <Loading/>
              ):(
      <Col sm={12} md={12}>
        <div className="about_container_img bg-image">
            <img src ="https://images.pexels.com/photos/859895/pexels-photo-859895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            className='w-100 h-100 img-fluid shadow-2-strong hover-shadow'/>
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <p className='text-white mb-0 text-uppercase fs-4 fw-bold'>history</p>
                    <p className='text-white mb-0 text-uppercase mt-3'>Home Page / <strong style={{color:"#cbba9c"}}>history</strong></p>
                </div>
                </div>
            </div>
        </div>
      <div className='p-3'>
      <table className=' table history_table ' >
          <thead>
              <tr >
                  <th className='text-center'>ID</th>
                  <th  className='text-center'>DATE</th>
                  <th  className='text-center'>TOTAL</th>
                  <th  className='text-center'>PAID</th>
                  <th  className='text-center'>DELIVERED</th>
                  <th  className='text-center'>ACTION</th>
              </tr>
          </thead>
          <tbody>
            
                  {historyData && [...historyData].slice(startPage,endPage).map(item=>{
                      return <tr key={item._id} className='history_tr'>
                          <td  className='text-center'>{item._id}</td>
                          <td  className='text-center'>{item.createdAt.substring(0,10)}</td>
                          <td  className='text-center'>{item.totalPrice && item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                          <td  className='text-center'>No</td>
                          <td  className='text-center'>No</td>
                          <td   className='text-center'>
                          <Link to={`/placeorder/order/${item._id}`}>
                              <button
                              className='nav_search_btn'
                                  type="button"
                                  variant="light"
                                  >
                                     Detail
                                      
                                  </button>
                            </Link>
                          </td>
                      </tr>
                  })}
              
          </tbody>
      </table>
      <Stack spacing={2} className="mt-3 mb-3">
            <Pagination count={paginShow.length} variant="outlined" shape="rounded"  onChange={handlePagination}/>
      </Stack>
      </div>
      </Col>
            
     )}
            
   </Row>
            
  )
}

export default HistoryComponent
