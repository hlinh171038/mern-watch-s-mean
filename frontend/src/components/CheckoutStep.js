import React from 'react'
import {Row,Col} from 'reactstrap'

function CheckoutStep(props) {
  return (
    <Row className="checkout__steps">
        <Col className={props.step1 ? "activeShipping":" "}>SignIn</Col>
        <Col className={props.step2 ? "activeShipping":" "}>Shipping</Col>
        <Col className={props.step3 ? "activeShipping":" "}>Payment</Col>
        <Col className={props.step4 ? "activeShipping":" "}>Place Order</Col>
    </Row>
  )
}

export default CheckoutStep
