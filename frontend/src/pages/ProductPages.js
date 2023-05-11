import React from 'react'
import Products from '../components/Products'
import Nav from '../components/NavComponent'
import SliderComponent from '../components/SliderComponent'
import CarouselComponent from '../components/CarouselComponent'
import Footer from '../components/Footer'


function ProductPages() {
  return (
    <div className='site__container'>
      <Nav/>
      <SliderComponent/>
      <Products/>
      <CarouselComponent/>
      <Footer/>
    </div>
  )
}

export default ProductPages
