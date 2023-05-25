import React, { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { Checkbox, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import { useGlobalContext } from '../context'
import CommentUser from './CommentUser'
import Rating from './Rating'
import { Col, Container, Row } from 'reactstrap'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { compareAsc, format } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function CommentComponent(...product) {
    const {carts } = useGlobalContext()
    const {userInfo} = carts
    const {_id,name} =product
    const [users,setUsers] = useState([])
    const [text,setText] = useState('')
    const [review,setReview] = useState(0)
    const [commentData,setCommentData] = useState([])
    const [filterSort,setFilterSort] =useState('newest')
    const [countPerPage,setCountPerPage] = useState(5)
    const [currentPage,setCurrentPage] = useState(1)
    const [isAnnonymus,setIsAnnonymous] = useState(false)
    let defaultReview = [1,2,3,4,5];
    //id prop from product detail
    //console.log(product[0]._id)
   // console.log(typeof(id))

   console.log( isAnnonymus)
   console.log( commentData)
    // handle change annonymous
    const handleChangeAnnonymous = (e)=>{
      console.log(e.target.value)
      let target = e.target.value
      if(target ==='annonymous') setIsAnnonymous(true)
      if(target ==='user') setIsAnnonymous(false)
    }
    // count the all the amount of user which comment
    console.log(commentData)
    const countStart = commentData && commentData.filter(item =>item.reviewItems[0].product === product[0]._id).reduce((cal,item)=>{
                            console.log( cal)
                             cal += item.reviewItems[0] && item.reviewItems[0].rating
                            return cal
                        },0)
   let total = commentData && commentData.filter(item =>item.reviewItems[0].product === product[0]._id)
   let tatalItem = (countStart/total.length).toFixed(2)
    console.log(tatalItem)
    
    // paginantion
    const end = countPerPage * currentPage
    const start = end - countPerPage;

    //
    let pagin =[]
    for (let i=0;i<Math.ceil(total.length/countPerPage);i++){
        pagin.push(i)
    }
   
     //handle pagination
     const handlePagination =(e,p)=>{
        console.log(e,p)
        setCurrentPage(p)
      }
    // handle to chose the star
    const handleReview =(e)=>{
        console.log(e.target.id)
        let target = e.target.id
        setReview(target)
        document.getElementById('1').classList.add('commnet_fill')
        for(let i=0;i<5;i++){
            document.getElementById(`${i+1}`).classList.remove('commnet_fill')
        }
       for(let i=0;i<target;i++){
        document.getElementById(`${i+1}`).classList.add('commnet_fill')
       }
    }
    //handle filter sort
     const handleFilterSort = (e) =>{
        setFilterSort(e.target.value)
        console.log(e.target.value)
        let target = e.target.value
        switch( target){
            case "newest":
                let newest = [...total].sort((a,b)=>{
                    console.log(a.createAt>b.createAt)
                    if(a.createdAt < b.createdAt) return 1;
                    if(a.createdAt > b.createdAt) return -1;
                    return 0;
                });
                console.log(newest)
                setCommentData(newest);
                console.log(commentData)
                break;
            case "lowToHight":
                let hight = [...total].sort((a,b)=>{
                    if(a.reviewItems[0].rating > b.reviewItems[0].rating) return 1
                    if(a.reviewItems[0].rating < b.reviewItems[0].rating) return -1
                    return 0
                });
                console.log(hight)
                setCommentData(hight)
                break;
            case "hightToLow":
                let low = [...total].sort((a,b)=>{
                    if(a.reviewItems[0].rating < b.reviewItems[0].rating) return 1
                    if(a.reviewItems[0].rating > b.reviewItems[0].rating) return -1
                    return 0
                });
                console.log(low)
                setCommentData(low)
                break;
            default:
               return;

        }
     }
    // handle submit
    const handleSubmit =(e) =>{
       e.preventDefault()
       // check user login or not
            if(!userInfo){
                toast.error('You must be Sign In to comment', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                return;
            }
       // check type comment or not
       if(!text){
        toast.error('typing your comment, please', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        return;
       }
       // check start
       if(!review){
        toast.error('choose the start,please', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        return;
       }
        let reviewItems =[]
        let pushItem = {rating:review,content:text,product:product[0]._id}
        reviewItems.push(pushItem)
        // console.log(reviewItems)
        // push data to server
        axios.post(`${process.env.REACT_APP_API}/api/products/comment`,{reviewItems},{
            headers:{
                authorization: `Bearer ${userInfo.token}`
            }
        })
        .then(res =>{
            const {data } = res;
            console.log(data)
            setText('')
            for(let i=0;i<5;i++){
                document.getElementById(`${i+1}`).classList.remove('commnet_fill')
            }
        })
        .catch(err=>{
            console.log(err)
        })

    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/api/comment`)
                .then(res =>{
                    const {data } = res
                    console.log(data)
                    setCommentData(data)
                    console.log(commentData)
                })
                .catch(err =>{
                    console.log(err)
                })
    },[handleSubmit])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'/api/users')
              .then(res =>{
                const {data } =res;
                setUsers(data)
                console.log( users)
              })
              .catch(err =>{
                console.log(err)
              })
    },[])
  return (
    <div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        <h3 className='text-center mt-3 '> Reviews</h3>
        <form onSubmit={handleSubmit} className='mt-3 '>
            <div className='comment_title_container'>
                <h4 className='comment_title'>Reviews and comment here</h4>
            </div>
            <div className='d-flex align-items-center mt-3 mb-3'>
                <span className='text-capitalize ps-3 text-secondary'>general assessment</span>
                <div className='d-flex justify-content-start align-items-center  ms-3'>
                    {defaultReview.map(item =>{
                        return <i id={item} className='fas fa-star ms-1' onClick={handleReview}></i>
                    })}
                </div>
            </div>
            <div className='p-3'>
                <p className='text-secondary ms-3 small' style={{'margin-bottom':"-.1rem"}}>Type 50 character <span style={{color:"rgb(203, 186, 156)"}}>Recive 100 coin</span></p>
                {/* <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}/> */}
                <textarea className='comment_textarea' 
                    type="text" value={text} 
                    onChange={(e)=>{setText(e.target.value)}} 
                    placeholder='What do you think about product quality and appearance?'
                    rows="4" cols="100"
                > </textarea>
                <div className='d-flex align-items-center justify-content-between'>
                    <button type="submit" className ="nav_search_btn mt-1">comment</button>
                </div>
                
            </div>
        </form>
        {total && total.length === 0 ? <div className='text-center text-secondary'>Have no comment</div>:
        <div>
           <div className='comment_title_container'>
            <h4 className='comment_title'>Rating and Review of {product[0].name}</h4>
           </div>
          <Row className='comment_start_container'>
            <Col md={4}>
                <div className='text-center'><span  className ="total_reviewer">{tatalItem ? tatalItem: 0}</span> /5</div>
                <div  className='text-center'> <Rating rating={tatalItem} numReviewer={total.length} style={{fontSize:"4rem"}}/>  </div>
              
            </Col>
            <Col md={6} className ="d-flex justify-content-center p-3">
               <div>
               {[...defaultReview].reverse().map(item=>{
                    let star =total && total.filter(x =>x.reviewItems[0].rating ===item)
                    let starResult = star.length
                return <div className=''><Rating rating={item} numReviewer={starResult} /></div>
               })}
               </div>
            </Col>

            
          </Row>
          <Row  className='comment_title_container'>
            
            <Col md={12} className=''>
               
                    <h4 className='comment_title'>Product Review</h4>
             
            </Col>
            </Row>
            <Row>
            <Col md={12} className='d-flex justify-content-end'>
                    <select
                      className='search_select comment_form_control'
                      value={filterSort}
                      onChange={handleFilterSort}
                    >
                      <option value="newest">Newest </option>
                      <option value="hightToLow">Rating: Highter To Lower</option>
                      <option  value="lowToHight">Rating: Lower To Highter</option>
                    
                    </select>
               
            </Col>
          </Row>
           <div>
            {commentData && [...commentData].filter(item=> item.reviewItems[0].product === product[0]._id).reverse().slice(start,end).map(item=>{
                // if(item.reviewItems[0] && item.reviewItems[0].product === product[0]._id){
                //     console.log('try')
                            return <Container>
                                    <Row className='mt-3 '>
                                                <Col md={1} sm={2} className='comment_item_avatar'>
                                                        <AccountCircleIcon className='' style={{fontSize:"4rem"}}/>
                                                    </Col>
                                                    <Col md={11} sm={10} className="comment_user_content_container">
                                                        <Col md={12} className='d-flex justify-content-between align-items-center'>
                                                            <span className='fw-bold '>{ users && users.filter(x =>x._id ===item.reviewItems[0].user).map(u => u.name)}</span>
                                                            <span className="text-muted small">{format(new Date(item.createdAt), 'dd-MM-yyyy HH:mm')}</span>
                                                        </Col>
                                                        <Col md={12}><span>{item.reviewItems[0].content}</span></Col>
                                                        
                                                        <span><Rating rating={item.reviewItems[0].rating } /></span>
                                                        <span></span>
                                                    </Col>
                                        </Row>
                                </Container>
                
            // }
            })}
           </div>
           <Stack spacing={2} className="mt-3 mb-3">
            <Pagination count={pagin.length} variant="outlined" shape="rounded"  onChange={handlePagination}/>
          </Stack>
        </div>
            }       
    </div>
  )
}

export default CommentComponent
