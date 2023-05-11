import React from 'react'
import { Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'reactstrap'

function AboutUsComponent() {
  return (
    <div className=''>
        <div className="about_container_img bg-image" >
            <img src ="https://images.pexels.com/photos/416339/pexels-photo-416339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            className='w-100 h-100 img-fluid shadow-2-strong hover-shadow'/>
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <p className='text-white mb-0 text-uppercase fs-4 fw-bold' >introduce</p>
                    <p className='text-white mb-0 text-uppercase mt-3'>Home Page / <strong style={{color:"#cbba9c"}}>Introduce</strong></p>
                </div>
                </div>
            </div>
        </div>
        <div className='about_content_cover'>
            <h3 className='text-center text-uppercase mt-5'>my time <span style={{color:"#cbba9c"}}>store</span></h3>
            <div className='about_line_cover'>
                <span className='about_line'></span>
                    <i class="fa-brands fa-firefox"></i>
                <span className='about_line'></span>
            </div>
        </div>
        <div className='about_text text-center mb-3 mt-3'>lorem text idome dropdown open to second mili , put down to do sothing wrong, Is also have one day  I will do it </div>
        <Container className='mt-5'>
            <Row >
                <Col sm={12} md={3} className='mb-5'>
                   <Row className='d-flex flex-column justify-content-center align-items-center h-100'>
                        <Col sm={12} style={{maxWidth:'500px'}} className=''>
                           <div className='d-flex justify-content-center align-items-center '>
                            <div className='about_p2_img_cover'>
                                    <img src="https://images.pexels.com/photos/705868/pexels-photo-705868.jpeg?auto=compress&cs=tinysrgb&w=600" />
                            </div>
                           </div>
                           <div className='text-container text-center mt-3'>
                                <h3> Sapphire Glass</h3>
                                <div>Sapphire is a precious gemstone, a variety of the mineral corundum, 
                                    consisting of aluminium oxide with trace amounts...
                                </div>  
                            </div>     
                        </Col>
                        <div className='p-5'></div>
                        <Col sm={12}>
                            <div className='d-flex justify-content-center align-items-center '>
                                <div className='about_p2_img_cover'>
                                        <img src="https://images.pexels.com/photos/3829446/pexels-photo-3829446.jpeg?auto=compress&cs=tinysrgb&w=600" />
                                </div>
                            </div>
                            <div className='text-container text-center mt-3'>
                                    <h3> Water Resistant</h3>
                                    <div>Water Resistant is a common mark stamped on the back of wrist watches to indicate how well a watch is sealed against the ingress of water.
                                    </div>  
                                </div>     
                        </Col>
                   </Row>
                </Col>
                <Col sm={12} md={6} className='mb-5'>
                    <div className='about_middle_img_cover'>
                        <img src="https://images.pexels.com/photos/2885991/pexels-photo-2885991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </div>
                </Col>
                <Col sm={12} md={3} className='mb-5' >
                <Row className='d-flex flex-column justify-content-center align-items-center h-100'>
                        <Col sm={12} style={{maxWidth:'500px'}} className=''>
                           <div className='d-flex justify-content-center align-items-center '>
                            <div className='about_p2_img_cover'>
                                    <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600" />
                            </div>
                           </div>
                           <div className='text-container text-center mt-3'>
                                <h3> Miyota Machine</h3>
                                <div>Sapphire is a precious gemstone, a variety of the mineral corundum, 
                                    consisting of aluminium oxide with trace amounts...
                                </div>  
                            </div>     
                        </Col>
                        <div className='p-5'></div>
                        <Col sm={12}>
                            <div className='d-flex justify-content-center align-items-center '>
                                <div className='about_p2_img_cover'>
                                        <img src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=600" />
                                </div>
                            </div>
                            <div className='text-container text-center mt-3'>
                                    <h3>Classic Design</h3>
                                    <div>Water Resistant is a common mark stamped on the back of wrist watches to indicate how well a watch is sealed against the ingress of water.
                                    </div>  
                                </div>     
                        </Col>
                   </Row>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default AboutUsComponent
