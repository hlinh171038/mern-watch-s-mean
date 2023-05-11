import React, { useState } from 'react'
import { Container, Form, FormGroup,Button, Row, Col, Alert } from 'reactstrap'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context'

function SignUpCompponent() {
    const {dispatchCart,carts} = useGlobalContext()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')
    const {search} = useLocation()
    const directInUrl = new URLSearchParams(search).get('direction')
    const redirect  = directInUrl ? directInUrl : '/' 
    const navigate = useNavigate()
    const submitHandler = (e) =>{
        e.preventDefault()
        setEmail('');
        if(password !== passwordConfirm){
            setError('password not fixed with password confirm')
            return;
        }
        axios.post(`${process.env.REACT_APP_API}/api/users/signup`,{
            name,
            email,
            password
        })
        .then(res =>{
            console.log(res.data)
            const {data} = res
            dispatchCart({type:"USER_SIGNIN",payload:data})
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate('/')
        })
        .catch(error =>{
           setError('Email is existed')
        })
    }
  return (
    <Container className='smaller__container '>
       <h1 className='my-3 text-center'><span style={{color:"#cbba9c"}}>Sign</span> Up</h1>
        <Row >
        
            <Col md={12 } className=' d-flex justify-content-center'>
            
                <Form className=' bg-light  p-3 ' onSubmit={submitHandler}>
                    {error && <Alert color="danger">
                                {error}
                            </Alert>}
                    <FormGroup>
                        <label name="name" className='w-100'>Name
                            <input id="name"
                                type="name" 
                                required
                                className='w-100'
                                placeholder='Name'
                                value={name}
                                onChange={e=>setName(e.target.value)}/>
                        </label>
                    </FormGroup>
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
                    <FormGroup>
                        <label name="passwordConfirm" className='w-100 '>Confirm Password
                            <input id="passwordConfirm" 
                                    type="password" 
                                    required
                                    className='w-100'
                                    placeholder='Password Confirm'
                                    value={passwordConfirm}
                                    onChange={e=>setPasswordConfirm(e.target.value)}/>
                        </label>
                    </FormGroup>
                    <div className='mb-3'>
                        {/* <Button type="submit" className='button__gold'>Sign </Button> */}
                        <button className='nav_search_btn'type="submit" >Sign Up</button>
                    </div>
                    <div className='mb-3'>
                        You allready have account ?{' '}
                        {/* <Link to={`/signup? redirect=${redirect}`}>Create a new acount</Link> */}
                        <Link to={`/signin?redirect=${redirect}`}>Login</Link>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default SignUpCompponent
