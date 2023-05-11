import React from 'react'
import Nav from '../components/NavComponent'
import PaymnetMethodComponent from '../components/PaymnetMethodComponent'
import Footer from '../components/Footer'

function PaymentPage() {
  return (
    <div>
      <Nav/>
      <PaymnetMethodComponent/>
      <Footer/>
    </div>
  )
}

export default PaymentPage
