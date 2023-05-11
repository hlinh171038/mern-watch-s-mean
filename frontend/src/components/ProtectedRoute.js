import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context'

function ProtectedRoute({children}) {
    const {carts} =useGlobalContext()
    const {userInfo} = carts
  return (
   userInfo ? children : <Navigate to="/signin"/>
  )
}

export default ProtectedRoute
