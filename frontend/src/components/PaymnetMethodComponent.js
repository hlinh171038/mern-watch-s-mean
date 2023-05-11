import React, { useEffect, useState } from 'react'
import CheckoutStep from './CheckoutStep'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'


function PaymnetMethodComponent() {
    const {carts,dispatchCart} = useGlobalContext()
    const [paymentMethodName,setPaymentMethod] = useState('PayPal')
    const navigate = useNavigate()


    const {shippingAddress,paymentMethod} = carts;
    //address is existed
    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[navigate,shippingAddress])
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatchCart({type:"PAYMENT__METHOD__SAVE",payload:paymentMethodName})
        localStorage.setItem('paymentMethod',JSON.stringify(paymentMethodName))
        navigate('/placeorder')
    }
  return (
    <div className='container mb-5'>
      <CheckoutStep step1 step2 step3 />
      <h1 className='my-3 text-center'><span style={{color:"#cbba9c"}}>Payment</span> Method</h1>
      <Form onSubmit={submitHandler}>
        <div className='mb-3'>
        <FormGroup check>
            <Input
                name="radio1"
                type="radio"
                value="PayPal"
                checked
                onChange={e =>setPaymentMethod(e.target.value)}
            />
            {' '}
            <Label check>
                PayPal
            </Label>
        </FormGroup>
        <FormGroup check >
            <Input
                name="radio1"
                type="radio"
                value="Stripe"
                onChange={e =>setPaymentMethod(e.target.value)}
            />
            {' '}
            <Label check>
                Stripe
            </Label>
        </FormGroup>
        </div>
        <button className = "nav_search_btn mt-3 mb-3" type="submit">Continue</button>
      </Form>
    </div>
  )
}

export default PaymnetMethodComponent
