import React from 'react'
import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'
function ProtectAdmin({children}) {
    const {carts} =useGlobalContext()
    const {userInfo} = carts
  return (
    userInfo && userInfo.isAdmin ?children: <Navigate  to="/signin"/>
  )
}

export default ProtectAdmin
