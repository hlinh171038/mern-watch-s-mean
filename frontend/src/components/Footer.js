import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Input, Row } from 'reactstrap'

function Footer() {
  return (
    <div className='bg-dark w-100'>
        <div className='footer_image'>
            <img src="https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
       
        <Row className="footer_container">
            <Col sm={12} md={6}  lg={3} className='text-white  d-flex justify-content-center align-items-center'>
            <Link to="/" className='text-decoration-none text-dark fs-1 fw-bold'><span className='footer_logo' style={{color:"#cbba9c"}}>W</span>men</Link>
            </Col>
            <Col sm={12} md={6} lg={3} className='text-white  d-flex align-items-center'>
                <ul className='footer_ul'>
                    <li><span className='me-1 '>
                        <i class="fa-sharp fa-solid fa-location-dot"></i>
                        </span>
                        778 Nhon Duc, Nha Be,HCM
                    </li>
                    <li>
                        <span className='me-1'>
                            <i class="fa-solid fa-phone"></i>
                        </span>
                        0772981024</li>
                    <li>
                        <span className='me-1'>
                            <i class="fa-solid fa-m"></i>
                        </span>
                        hoanglinh171038@gmail.com</li>
                    <li>
                        <span className='me-1'>
                        <i class="fa-brands fa-facebook text-white"></i>
                        </span>
                        LinhThai.facebook.com</li>
                </ul>
            </Col>
            <Col sm={12} md={6} lg={3} className='text-white  d-flex align-items-center footer_ul'>
                <div>
                    <div className='fs-3 fw-bolder text-white text-uppercase ms-3'>follow <span style={{color:"#cbba9c"}}>Us</span></div>
                    <div className='text-white ms-3 mt-3 mb-3'>Follow to not miss any chance from us</div>
                    <div className='d-flex justify-content-around align-items-center text-light mt-3'>
                        <div>
                            <i class="fa-brands fa-facebook text-white fs-5"></i>
                        </div>
                        <div>
                            <i class="fa-brands fa-instagram text-white fs-5"></i>
                        </div>
                        <div>
                            <i class="fa-brands fa-twitter text-white fs-5"></i>
                        </div>
                        <div>
                            <i class="fa-brands fa-youtube text-white fs-5"></i>
                        </div>
                        <div>
                             <i class="fa-brands fa-pinterest text-white"></i>
                        </div>
                    </div>
                </div>
            </Col>
            <Col sm={12} md={6} lg={3} className='text-white d-flex align-items-center footer_ul'>
                <div>
                    <div className='fs-3 fw-bolder text-white text-uppercase ms-3'>registry</div>
                    <div className='text-white ms-3 mt-3 mb-3'>Registry to recived the newest information from us</div>
                    <div className='d-flex justify-content-center container'>
                    <input type="text" 
                                 className='nav_search_input'
                                 placeholder='Email ...' 
                                 />
                          <button className='nav_search_btn'type="submit" >Submit</button>
                    </div>
                </div>
            </Col>
        </Row>
        </div>
        <Row>
            <Col md={12} className='text-light text-center text-muted fs-9 '>
                Coppy right by @ hoanglinh171038@gmail.com
            </Col>
        </Row>
    </div>
  )
}

export default Footer
