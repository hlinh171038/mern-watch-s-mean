import React, { useEffect, useState } from 'react'
import { Form,FormGroup,Label,Input, Button} from 'reactstrap'
import {useGlobalContext} from '../context'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from './CheckoutStep'


function ShippingAdressComponent() {
    const {dispatchCart,carts} = useGlobalContext()
    const {shippingAddress,userInfo} = carts
    console.log(shippingAddress)
    const [fullname,setFullname] = useState(shippingAddress.fullname ||'')
    const [address,setAddress] = useState(shippingAddress.address ||'')
    const [city,setCity] = useState(shippingAddress.city ||'')
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode ||'')
    const [country,setCountry] = useState(shippingAddress.country ||'')
    const navigate = useNavigate()

const submitHandler =(e) =>{
    e.preventDefault();
    dispatchCart({type:"SAVE_SHIPPING_ADDRESS",payload:{
        fullname,
        address,
        city,
        postalCode,
        country
    }});
    localStorage.setItem('shippingAddress',JSON.stringify({
        fullname,
        address,
        city,
        postalCode,
        country
    }));
    navigate('/payment')
}
useEffect(()=>{
    if(!userInfo){
        navigate('/signin?redirect=/shipping')
    }
},[userInfo,navigate])
  return (
    
    <div className='container mb-5' >
    <CheckoutStep step1 step2/>
      <h1 className='text-center mb-5'><span style={{color:"#cbba9c"}}>Shipping</span> Address</h1>
      <Form onSubmit={submitHandler} >
        <FormGroup>
                <Label for="Name">
                    Full Name
                </Label>
                <Input
                id="Name"
                name="Name"
                placeholder="Full Name"
                type="text"
                value={fullname}
                required
                onChange={e=>setFullname(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="address">
                Address
                </Label>
                <Input
                id="address"
                name="address"
                placeholder="Address"
                type="text"
                value={address}
                required
                onChange={e=>setAddress(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="city">
                City
                </Label>
                <Input
                id="city"
                name="city"
                placeholder="City"
                type="text"
                value={city}
                required
                onChange={e=>setCity(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="postalCode">
                PostalCode
                </Label>
                <Input
                id="postalCode"
                name="postalCode"
                placeholder="PostalCode"
                type="text"
                value={postalCode}
                required
                onChange={e=>setPostalCode(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="country">
                Country
                </Label>
                <Input
                id="country"
                name="country"
                placeholder="Country"
                type="text"
                value={country}
                required
                onChange={e=>setCountry(e.target.value)}
                />
            </FormGroup>
            <button className='nav_search_btn mt-3'type="submit" >Continue</button>
      </Form>
    </div>
  )
}

export default ShippingAdressComponent
