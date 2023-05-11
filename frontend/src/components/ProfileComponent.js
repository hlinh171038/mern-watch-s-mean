import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import axios from 'axios'
function ProfileComponent() {
    const {carts} = useGlobalContext()
    const {userInfo} = carts
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] =useState('')
    const [confirm,setConfirm] = useState('')
    const [error,setError] =useState('')
    const [success,setSuccess] = useState('')
const handleSubmit =(e) =>{
    e.preventDefault()
    setError('')
    setSuccess('')
    if(password !== confirm){
        setError('Password is not fixed');
        return ;
    }
    axios.put(`${process.env.REACT_APP_API}/api/users/update`,{
        name,email,password
    },{
        headers:{authorization: `Bearer ${userInfo.token}`}
    }).then(res =>{
        console.log(res.data)
        const {data } =res
        localStorage.setItem('userInfo',JSON.stringify(data))
        setSuccess('Update is success')
    }).catch(error =>{
        console.log(error)
        setError('Email is wrong. Email must be @ and .com')
    })
}
useEffect(()=>{
    setName(userInfo.name)
    setEmail(userInfo.email)
    
    setError('')
    setSuccess('')
},[])
  return (
    <div className='container mt-5 mb-5'>
      <h1 className='my-3 text-center mb-5'>User <span style={{color:"#cbba9c"}}>Profile</span></h1>
      <Form onSubmit={handleSubmit}>
        {error ?<Alert color='danger'>{error}</Alert>:(success ? <Alert color='success'>{success}</Alert>:'')}
        <FormGroup>
            <Label for="name">
                Name
            </Label>
            <Input
            id="name"
            name="name"
            placeholder="name"
            type="text"
            value={name}
            onChange={e=>setName(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="Email">
                Email
            </Label>
            <Input
            id="Email"
            name="email"
            placeholder="Email"
            type="text"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="Password">
                Password
            </Label>
            <Input
            id="Password"
            name="Password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="Confirm">
                Confirm
            </Label>
            <Input
            id="Confirm"
            name="Confirm"
            placeholder="Confirm"
            type="password"
            value={confirm}
            onChange={e=>setConfirm(e.target.value)}
            />
        </FormGroup>
        <button type="submit" className='nav_search_btn'>Update Profile</button>
      </Form>
    </div>
  )
}

export default ProfileComponent
