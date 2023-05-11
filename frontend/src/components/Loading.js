import React from 'react'
import {Spinner} from 'reactstrap'

function Loading() {
  return (
    <div className='d-flex justify-content-center'>
        <Spinner className='text-center ' style={{color:"#cbba9c"}}>
            <span className='visually-hidden'>Loading...</span>
        </Spinner>
    </div>
  )
}

export default Loading
