import React, { useEffect } from 'react'
import Loading from './Loading'
import { Alert, Button, Col, Row } from 'reactstrap'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function HistoryComponent() {
    const {carts,historys,dispatchHistory} = useGlobalContext()
    const {userInfo} = carts
    const navigate = useNavigate()
    const {error,loading,orderHistory} = historys
      
    useEffect(()=>{
        dispatchHistory({type:"FECTCH_REQUEST"})
        axios.get(`${process.env.REACT_APP_API}/api/orders/history`,
                    {headers:{authorization: `Bearer ${userInfo.token}`}})
            .then(res =>{
                const {data } =res;
                console.log(data)
                dispatchHistory({type:"FETCH_SUCCESS",payload:data})
            })
            .catch(error =>{
                console.log(error)
                dispatchHistory({type:"FETCH_FAIL",payload:error})

            })
    },[])
  return (
    <Row className=' mt-5 mb-5'>
     <h1 className='text-center mb-5'>Order <span style={{color:"#cbba9c"}}>History</span></h1>
      {loading ? (
        <Loading/>
      ):error ?(
        <Alert color="danger">{error}</Alert>
      ):(
        <Col sm={12} md={12}>
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
              
                    {orderHistory && orderHistory.map(item=>{
                        return <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.createdAt.substring(0,10)}</td>
                            <td>{item.totalPrice}</td>
                            <td>No</td>
                            <td>No</td>
                            <td >
                                <button
                                className='nav_search_btn'
                                    type="button"
                                    variant="light"
                                    onClick={()=>{
                                        navigate(`/placeorder/order/${item._id}`)
                                    }}>
                                        Detail
                                    </button>
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
