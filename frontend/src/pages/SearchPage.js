import React from 'react'
import SearchComponent from '../components/SearchComponent'
import NavComponent from '../components/NavComponent'
import Footer from '../components/Footer'

function SearchPage() {
  return (
    <div style={{overflow:'hidden'}}>
        <NavComponent/>
      <SearchComponent/>
      <Footer/>
    </div>
  )
}

export default SearchPage
