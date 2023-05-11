import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Form, FormGroup, Input, Row } from 'reactstrap'

function BlogEditComponent() {
  const [blogDetail,setBlogDetail] = useState([])
  const {id} =useParams()
  const [value, setValue] = useState('');
  const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [files,setFiles] = useState('')
    const [error,SetError] =useState('')
    const [success,setSuccess] = useState('')

const edit =async(e) =>{
  e.preventDefault()
  console.log('hello')
 axios.put(`${process.env.REACT_APP_API}/api/blog/update`,{
  title,summary,files,id,value
 }).then(res =>{
    navigate(`/blog/${id}`)
 })
}
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_API}/api/blog/${id}`)
        .then(res =>{
            const {data } =res;
            console.log(data)
            setBlogDetail(data)
            setTitle(data.title)
            setSummary(data.summary)
            setFiles(data.cover)
            setValue(data.content)
        }).catch(error =>{
            console.log(error)
        })
},[])
  return (
    <Row className='blog_deit_row'>
       <h3 className='text-center mb-3'><span style={{color:'#cbba9c'}}>Edit</span> Blog</h3>
      <Col md={12} className='d-flex justify-content-center '>
       
      <Form onSubmit={edit} className='w-50'>
            <FormGroup>
                <Input
                placeholder="Title"
                type="text"
                value={title}
                onChange={e=>setTitle(e.target.value)}
                required
                />
            </FormGroup>
            <FormGroup>
                <Input
                placeholder="Summary"
                type="text"
                value={summary}
                onChange={e=>setSummary(e.target.value)}
                required
                />
            </FormGroup>
            <FormGroup>
                <Input
                name="file"
                placeholder="file"
                type="file"
                
                onChange={e=>setFiles(e.target.files)}
                required
                />
            </FormGroup>
            <ReactQuill theme="snow"
                        value={value} 
                        onChange={setValue} 
                        className='mt-3 mb-3 ' />
            <FormGroup>
                <button className='nav_search_btn' type="submit" >Update BLog</button>
            </FormGroup>
        </Form>
      </Col>
    </Row>
  )
}

export default BlogEditComponent
