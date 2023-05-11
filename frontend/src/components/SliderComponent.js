import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Col, Row } from 'reactstrap'

const imgData = [
    {
        img:'https://images.pexels.com/photos/325845/pexels-photo-325845.jpeg?auto=compress&cs=tinysrgb&w=600',
        id:0,
        content:"Swiss watches hot trending to day"
    },
    {
        img:'https://images.pexels.com/photos/859895/pexels-photo-859895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        id:1,
        content:'timepiece for men'
    },
    {
        img:'https://images.pexels.com/photos/691640/pexels-photo-691640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        id:2,
        content:"best seller"
    },
    {
        img:'https://images.pexels.com/photos/158741/gshock-watch-sports-watch-stopwatch-158741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        id:3,
        content:"G-Shock personality version"
    },
    {
        img:'https://images.pexels.com/photos/179912/pexels-photo-179912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        id:4,
        content:"hotest in 2023"
    },

]
function SliderComponent() {
    const [index,setIndex] = useState(1)
    const [style,setStyle] = useState(false)

    const checkSlider = (num) =>{
        if(num ===imgData.length ){
            num =0
        }else if(num <0){
            console.log('o nef')
            num = imgData.length-1
            console.log(num)
        }else{
           num = num
        }
        return num
    }

    const handlePrev =()=>{
        console.log(index -1)
        setIndex(checkSlider(index-1))
        setStyle(true)
    }
    const handleNext =()=>{
        setIndex(checkSlider(index+1))
    }
    useEffect(()=>{
        const timer = setInterval(()=>{
            handleNext()
        },5000);
        return () => clearInterval(timer)
    },[index])
  return (
    <div className='' style={{overflow:"hidden"}}>
        <div className='slider_total'>
            <div className='slider_prev' onClick={handlePrev}>
                <ArrowBackIosIcon/>
            </div>
            <div className ="slider_container">
            <img src={imgData[index].img} className='slider_img'/>
            <div className='slider_text_container'>
                <p className='slider_title text-uppercase fs-1' > 
                    {imgData[index].content}
                    <p className='slider_text_nomal'>Lorem i used for this, you cant change the world <br/> but you can change myself</p>
                </p>
            </div>
            </div>
            <div className='slider_next' onClick={handleNext}>
                <ArrowForwardIosIcon/>
            </div>
        </div>
        <Row className="slider_down">
            {/* <Col sm={12} md={4} lg={4} className='slider_down_left '>
                <div className='slider_down_left_img'>
                </div>
                <div className="slider_down_left_content text-sm-center text-lg-start" >
                    <p className='text-uppercase text-white fw-bold fs-5'>rider limited version</p>
                    <p className='text-white'>With the light tone, large version, simple design but delicate, luxury</p>
                    <button className='button__gold p-1'>See More </button>
                </div>
            </Col> */}
            <Col sm={12} md={4} lg={4} className='slider_down_left '>
                <img src="https://images.pexels.com/photos/404181/pexels-photo-404181.jpeg?auto=compress&cs=tinysrgb&w=600"
                     className='slider_down_left_img'
                />
                <div className="slider_down_left_content text-sm-center text-lg-start" >
                    <p className='text-uppercase text-white fw-bold fs-5'>rider limited version</p>
                    <p className='text-white'>With the light tone, large version, simple design but delicate, luxury</p>
                    <div className='btn_all_web'>
                                <span>See More</span>
                            </div>
                </div>
            </Col>
            <Col sm={12} md={4} className='silder_down_mid '>
                <Row className='bg-danger'>
                    <Col sm={12}  className="slider_down_mid_1">
                        <img src="https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=600"
                            className='slider_down_mid_img_1'
                        />
                        <div className="slider_down_mid_content  ">
                            <p className='text-uppercase text-white fw-bold fs-5 '>rider limited version</p>
                            <div className='btn_all_web'>
                                <span>See More</span>
                            </div>
                        </div>
                        </Col>
                        <Col sm={12} className="slider_down_mid_2">
                            <div className='slider_down_mid_img_2'>
                            
                            </div>
                        </Col>
                </Row>
            </Col>
            <Col sm={12} md={4} className='slider_down_right'>
                <img src="https://images.pexels.com/photos/1075189/pexels-photo-1075189.jpeg?auto=compress&cs=tinysrgb&w=600"
                     className='slider_down_right_img'/>
                <div className="slider_down_right_content">
                    <p className='text-uppercase text-white fw-bold fs-5'>rider limited version</p>
                    <p className='text-white'>With the light tone, large version, simple design but delicate, luxury</p>
                    {/* <button className='button__gold p-1'>See More </button> */}
                    <div className='btn_all_web'>
                        <span>See More</span>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
    
  )
}

export default SliderComponent
