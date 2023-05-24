import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Rating from './Rating'

function CommentUser(handleSubmit,{...product}) {
    
    const [commentData,setCommentData] = useState([])
    console.log(commentData)
    console.log(product)
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
    },[])
  return (
    <div>
      {commentData && commentData.map(item=>{
        if(item.reviewItems[0].product === product[0]._id){
            console.log('try')
            return <div>
                    <div><span>{item.reviewItems[0].content}</span></div>
                    <div>
                    <span><Rating rating={item.reviewItems[0].rating } /></span>
                    <span></span>
                </div>
            </div>
        }
      })}
    </div>
  )
}

export default CommentUser
