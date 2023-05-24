import React, { useState } from 'react'
import { Alert, Col, Form, FormGroup, Input, Row } from 'reactstrap'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostBlogComponent() {
    const [value, setValue] = useState('');
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [files,setFiles] = useState('')
    const [error,SetError] =useState('')
    const [success,setSuccess] = useState('')
    const navigate = useNavigate()
    const post =async(e) =>{
        SetError('');
        setSuccess('')
        e.preventDefault()
        const data = new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',value)
        data.set('file',files[0])
        const response = await fetch(`${process.env.REACT_APP_API}/api/blog/post`,{
            method:'POST',
            body:data
        })
        if(response.ok){
            setSuccess('Your Blog is Post success');
            toast.warn('Your Blog is Post success', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: "light",
                });
            setFiles('');
            setSummary('')
            setValue('')
            navigate('/blog')
        }else{
            SetError('Fail to post, check again')
        }
    }
  return (
    <Row  className='d-flex justify-content-center mt-5 mb-5'>
        <ToastContainer
            position="top-center"
            autoClose={false}
            limit={1}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            />
        <h3 className='text-center'><span style={{color:"#cbba9c"}}>POST</span> BLOG</h3>
        <Col  md={12} sm={12} lg={4} className='  p-3 mt-3'  style={{background:"rgb(203 186 156 / 33%)"}}>
        {success && <Alert color='success'>{success}</Alert>}
        {error && <Alert color='danger'>{error}</Alert>}
        <Form onSubmit={post}>
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
                {/* <Input
                type="submit"
                value="Create Post"
                className='text-light bg-secondary'
                /> */}
                <button className='nav_search_btn'type="submit" >Create Post</button>
            </FormGroup>
        </Form>
        </Col>
        
      
    </Row>
  )
}

export default PostBlogComponent
