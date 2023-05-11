import React,{useEffect, useState} from 'react'
import { Container, Form, FormGroup,Button, Row, Col, Alert } from 'reactstrap'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context'

function SigninConponent() {
    const {dispatchCart,carts} = useGlobalContext()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const {search} = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl: '/'
    const navigate = useNavigate()

const submitHandler = async(e) =>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/api/users/signin`,{email,password})
         .then(res =>{
            const {data} =res
            dispatchCart({type:"USER_SIGNIN",payload:data})
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate(redirect || '/')
         })
         .catch(err=>{
            //console.log(err.response.data)
            setError(err.response.data)
         })
}
// check links
useEffect(()=>{
    if(carts.userInfo){
        navigate(redirect)
    }
},[navigate,carts.userInfo,redirect])
  return (
    <Container className='smaller__container '>
       <h1 className='my-3 text-center'><span style={{color:"#cbba9c"}}>Sign</span> In</h1>
        <Row >
        
            <Col md={12 } className=' d-flex justify-content-center'>
            
                <Form className=' bg-light  p-3 ' onSubmit={submitHandler}>
                    {error && <Alert color="danger">
                                {error}
                            </Alert>}
                    <FormGroup>
                        <label name="email" className='w-100'>Email
                            <input id="email"
                                type="email" 
                                required
                                className='w-100'
                                placeholder='Email'
                                value={email}
                                onChange={e=>setEmail(e.target.value)}/>
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label name="password" className='w-100 '>Password
                            <input id="password" 
                                    type="password" 
                                    required
                                    className='w-100'
                                    placeholder='Password'
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}/>
                        </label>
                    </FormGroup>
                    <div className='mb-3'>
                        <button className='nav_search_btn'type="submit" >Sign In</button>
                    </div>
                    <div className='mb-3'>
                        New customer ?{' '}
                        <Link to={`/signup?redirect=${redirect}`}>Create a new acount</Link>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default SigninConponent
