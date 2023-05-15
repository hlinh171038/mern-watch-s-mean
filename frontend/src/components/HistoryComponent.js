import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { Alert, Button, Col, Row } from 'reactstrap'
import { useGlobalContext } from '../context'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function HistoryComponent() {
    const {carts,historys,dispatchHistory} = useGlobalContext()
    const {userInfo} = carts
    const navigate = useNavigate()
    const {error,loading,orderHistory} = historys
    const [historyData,setHistoryData] = useState(null)
    const [loadingPage,setLoadingPage] = useState(true)
    useEffect(()=>{
      setLoadingPage(true)
        dispatchHistory({type:"FECTCH_REQUEST"})
        axios.get(`${process.env.REACT_APP_API}/api/orders/history`,
                    {headers:{authorization: `Bearer ${userInfo.token}`}})
            .then(res =>{
                const {data } =res;
                console.log(data)
                setHistoryData(data)
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
    <Row className=' mt-5 mb-5'>
     <h1 className='text-center mb-5'>Order <span style={{color:"#cbba9c"}}>History</span></h1>
      {loadingPage ? (
        <Loading/>
      ):(
        <Col sm={12} md={12}>
        <table className='table '>
            <thead>
                <tr>
                    <th className='text-center'>ID</th>
                    <th  className='text-center'>DATE</th>
                    <th  className='text-center'>TOTAL</th>
                    <th  className='text-center'>PAID</th>
                    <th  className='text-center'>DELIVERED</th>
                    <th  className='text-center'>ACTION</th>
                </tr>
            </thead>
            <tbody>
              
                    {historyData && historyData.map(item=>{
                        return <tr key={item._id}>
                            <td  className='text-center'>{item._id}</td>
                            <td  className='text-center'>{item.createdAt.substring(0,10)}</td>
                            <td  className='text-center'>{item.totalPrice}</td>
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
        </Col>
      )}
      
    </Row>
  )
}

export default HistoryComponent
