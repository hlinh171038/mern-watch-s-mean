import React from 'react'
import { Button, Col, Container, Input, Row } from 'reactstrap'
import FacebookIcon from '@mui/icons-material/Facebook';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';

function IntroComponent() {
  return (
    <div>
      <div className="about_container_img bg-image" >
            <img src ="https://images.pexels.com/photos/859895/pexels-photo-859895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            className='w-100 h-100 img-fluid shadow-2-strong hover-shadow'/>
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <p className='text-white mb-0 text-uppercase fs-4 fw-bold'>Contact</p>
                    <p className='text-white mb-0 text-uppercase mt-3'>Home Page / <strong style={{color:"#cbba9c"}}>Contact</strong></p>
                </div>
                </div>
            </div>
        </div>
        <Container className='mt-5 mb-5'>
          <Row >
            <Col md={6} className=''>
            <div className='w-100 h-100'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.724908214882!2d106.6972317600607!3d10.678447789420506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317530403c4e3c23%3A0x9e8eec6b7047566e!2z4bqkcCAyLCBOaMahbiDEkOG7qWMsIE5ow6AgQsOoLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1682669616375!5m2!1svi!2s" 
              style={{width:'100%',height:"100%"}}
              allowfullscreen="" loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            </Col>
            <Col md={6}  id='contact_right_container'>
              <Row>
                <Col md={12}>
                  <ul className='footer_address_ul'>
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
                            <AttachEmailIcon/>
                          </span>
                          hoanglinh171038@gmail.com</li>
                      <li>
                          <span className='me-1'>
                          <FacebookIcon/>
                          </span>
                          LinhThai.facebook.com</li>
                  </ul>
                </Col>
              </Row>
              <Row className=' '>
                <Col md={12} className=' '>
                  <h3 className='text-center text-uppercase'>Contact <span style={{color:"#cbba9c"}}>me</span></h3>
                  <div className='about_line_cover'>
                    <span className='about_line'></span>
                        <i class="fa-brands fa-firefox"></i>
                    <span className='about_line'></span>
                  </div>
                  <form className='mt-3'>
                    <Row className='contact_input'>
                      <Col md={6} className='ps-1 '>
                        <input type="text" placeholder="Name" className='w-100 ps-1'/>
                      </Col>
                      <Col md={6}>
                        <input type="text" placeholder="Phone number" className='w-100 ps-1'/>
                      </Col>
                    </Row>
                    <Row  className='contact_input'>
                      <Col md={6}>
                        <input type="text" placeholder="Email" className='w-100 ps-1'/>
                      </Col>
                      <Col md={6}>
                        <input type="text" placeholder="Address" className='w-100 ps-1'/>
                      </Col>
                    </Row>
                    <Row >
                    <textarea id="w3review" name="w3review" rows="4" cols="50"className=' ps-1' >
                      Comment
                    </textarea>
                    </Row>
                    <Row className='contact_button w-100  d-flex justify-content-center align-items-center mt-1'>
                        <div className='btn_all_web d-inline-block  text-center'>
                          <span className=''>Send Me</span>
                        </div>
                    </Row>
                  </form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default IntroComponent
