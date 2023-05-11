import React, { useState } from 'react'
import { PaginationItem, PaginationLink } from 'reactstrap';

function Pagination(postPerPage,total) {
 
    console.log(postPerPage,total)
    var d = parseInt(total)
    var c= parseInt(postPerPage)
    
    console.log(c*2)
    let pages = []
    for(let i=1;i <=postPerPage;i++){
        pages.push(i);
    }
    console.log(pages)
  return (
   <div>
        <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                {pages.map(page =>{
                    return <li class="page-item">{page}</li>
                })}
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
        </nav>
   </div>
  )
}

export default Pagination
