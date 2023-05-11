import React,{useRef, useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../context'
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import { Badge, 
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Navbar,
        Container,
        NavbarToggler,
        Collapse,
        NavbarBrand,
        NavItem,
        Nav,
        Button,
        Form,
        Input,
      } from 'reactstrap'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function NavComponent() {
  const {carts,dispatchCart,search,setSearch,searchProduct,setProductFilter,setError} = useGlobalContext();
  const [fix,setFix] =useState(false);
  const [scroll,setScroll] = useState(false)
  let navRef = useRef()
  const [openMenu,setOpenMenu] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [adminSideBar,setAdminSideBar] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);
  
  const navigate = useNavigate()



  const signout = (e)=>{
    dispatchCart({type:"USER_SIGNOUT"})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
  }
  // sticky navbar 
   const fixedNav = () =>{
      if(window.scrollY >= 52){
        setFix(true)
    }else{
      setFix(false)
    }
    
   }
   //scrolling top button
    const scrollBtn = () =>{
      if(window.scrollY >= 400){
        setScroll(true)
      }else{
        setScroll(false)
      }
    }

   window.addEventListener('scroll',scrollBtn)
   window.addEventListener('scroll',fixedNav)
  //handle search
  const handleSearch =(e)=>{
    e.preventDefault()
    setOpenMenu(false)
    setError('')
    let target = e.currentTarget[0].value;
    const result = searchProduct.filter(item =>{
        return item.name.toLowerCase().includes(target.toLowerCase()) || 
        item.category.toLowerCase().includes(target.toLowerCase()) || 
        item.brand.toLowerCase().includes(target.toLowerCase());
    })
    if(result.length === 0){
        setError('YOUR PRODUCT NOT EXIST ! TRY OTHER PRODUCT')
    }
    setProductFilter(result);
    setSearch('')
   navigate('/search')
}

   return (
    <div className='nav_container' id="section">
        {/* nav small */}
        <div className={scroll ? 'scroll_top ':'scroll_top active_scroll'}>
        <a href="#section"><ArrowDropUpIcon className='text-decoration-none text-white fs-4'/></a> 
        </div>
        {openMenu && <div className='nav_menu_container'>
          <div className='nav_menu_left '>
            <div className='nav_close_menu w-100 d-flex justify-content-end align-items-start'>
              <span className=''  onClick={()=>{setOpenMenu(!openMenu)}}><CancelIcon/></span>
            </div>
            <ul id="nav_ul">
              <li className='d-flex justify-content align-items-center'>
             
              <form style={{}} className='d-flex' onSubmit={handleSearch}>
                          <input type="text" 
                                 className='nav_search_input'
                                 placeholder='Find your product' 
                                 required
                                 value={search}
                                 onChange={e=>setSearch(e.target.value)}/>
                          <button className='nav_search_btn'type="submit" >Search</button>
                        
                        </form>
              </li>
              <li>
                <NavLink to='/' className='text-decoration-none '>
                    Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/search' className='text-decoration-none '>
                    Product
                </NavLink>
              </li>
              <li>
                <NavLink to='/blog' className='text-decoration-none '>
                    Blog
                </NavLink>
              </li>
              <li>
               <NavLink to='/about' className='text-decoration-none '>
                    About
                </NavLink>
              </li>
              <li>
                < NavLink to='/introduce' className='text-decoration-none '>
                    Contact
                </NavLink>
              </li>
              <li>
               <NavLink to='/profile' className='text-decoration-none '>
                    Uppdate Profiles
                </NavLink>
              </li>
             
              {carts.userInfo && carts.userInfo.isAdmin && 
                          <li>
                             <div className='admin_popup_container'>
                              <div className="admin_popup_title d-flex justify-content-between">
                                <span>Admin</span>
                                <button onClick={() =>setAdminSideBar(!adminSideBar)} className="border-0 " style={{background:"none"}}><KeyboardArrowDownIcon /></button>
                              </div>
                                {adminSideBar && 
                                <div>
                                  {/* <div>
                                    <Link to="/dashboard" className='text-decoration-none text-secondary'>
                                          Dashboard
                                    </Link>
                                    <hr/>
                                  </div> */}
                                  <div>
                                  <Link to="/post-product" className='text-decoration-none text-secondary'>
                                       Post Product
                                  </Link>
                                  <hr/>
                                  </div>
                                  <div>
                                  <Link to="/post-blog" className='text-decoration-none text-secondary'>
                                        Post Blog
                                  </Link>
                                  </div>                                 
                                </div> }
                           </div>
                          </li>
                          }
             
              <li>
                { carts.userInfo ?
                < NavLink to="#signout" className='text-decoration-none ' onClick={signout}>
                      Sign Out
                  </NavLink>:
                  < NavLink to='/signin' className='text-decoration-none '>
                     Sign In
                  </NavLink>}
              {/* < NavLink to='/sign-in' className='text-decoration-none '>
                   Sign In
              </NavLink> */}
              </li>
              <li id="last_child">hostline: 0772981024</li>
            </ul>
          </div>
          <div className='nav_menu_right'>
           cover
          </div>
        </div>}
        {/* nav larger */}
        <Navbar  expand="sm" className='d-flex' style={{transition:"all 1s ease"}}>
            <span className='nav_toggle' onClick={()=>{setOpenMenu(!openMenu)}}><MenuIcon/></span>
            <NavbarBrand  className="me-auto" style={{padding:"0 .7rem"}}>
                <Link to="/" className='text-decoration-none text-dark fs-3'><span className='' style={{color:"#cbba9c"}}>W</span>men</Link>
            </NavbarBrand>
            
            {/* <NavbarToggler onClick={toggleNavbar} className="me-2" /> */}
            
              <Nav navbar  className='w-100 justify-content-end'>
                <NavItem className='nav_search_form ' >
                  <div className='search__form  ' >
                        <Form style={{}} className='d-flex' onSubmit={handleSearch}>
                          <input type="text" 
                                 className='nav_search_input'
                                 placeholder='Find your product' 
                                 required
                                 value={search}
                                 onChange={e=>setSearch(e.target.value)}/>
                          <button className='nav_search_btn'type="submit" >Search</button>
                        
                        </Form>
                  </div>
                </NavItem>
                 
                <NavItem className='nav__items navbar_up_border_last' >
                  <Link to='/cart' className='text-decoration-none text-dark  '  style={{minWidth:"70px"}} >
                          <span className='fs-5'><i class="fa-solid fa-cart-plus"></i> </span>
                          {carts.cart.length>0 &&
                          <Badge pill color='danger' className='text-light small '>
                            {carts.cart.reduce((cal,item)=>cal+item.quantity,0)}
                          </Badge> }
                        </Link>
                </NavItem>
                <NavItem className='nav_user nav__items nav_user'>
                 
                  {carts.userInfo?
                                  <Dropdown isOpen={dropdownOpen} toggle={toggle} className='navbar_up_border' >
                                  <DropdownToggle caret size="sm" className='bg-white  text-dark border-0'>
                                    <span className='fs-6'><i class="fa-regular fa-user"></i></span>
                                   
                                  </DropdownToggle>
                                  <DropdownMenu>
                                  <DropdownItem header>
                                     Webcome {carts.userInfo.name}
                                  </DropdownItem>
                                  <DropdownItem header>
                                    <Link to="/profile" className='text-decoration-none text-secondary'>
                                      User Profile
                                    </Link>
                                    </DropdownItem>
                                    <DropdownItem header> <Link to="/orderhistory" className='text-decoration-none text-secondary'>Order History</Link></DropdownItem>
                                    <hr/>
                                    <DropdownItem>
                                    {/* <button className='nav_search_btn w-100'>
                                      <Link to="#signout" className='text-decoration-none text-light' onClick={signout}>
                                        Sign out
                                      </Link>
                                    </button> */}
                                       <Link to="#signout" className='text-decoration-none text-light' onClick={signout}>
                                       <button className='nav_search_btn w-100 '>
                                          Sign Out 
                                          </button>
                                      </Link> 
                                      
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                                  :
                                  <Dropdown isOpen={dropdownOpen} toggle={toggle}   className='navbar_up_border' >
                                  <DropdownToggle caret size="sm" className='bg-white  text-dark border-0'>
                                    <span className='fs-6'><i class="fa-regular fa-user"></i></span>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                  <DropdownItem >
                                    {/* <button className='button__gold w-100'>
                                      <Link to="/signin" className='text-decoration-none text-light' >
                                        Sign in
                                      </Link>
                                    </button> */}
                                    <Link to="/signin" className='text-decoration-none text-light' >
                                       <button className='nav_search_btn w-100 '>
                                          Sign in
                                          </button>
                                      </Link> 
                                    </DropdownItem>
                                    <DropdownItem >
                                    {/* <button className='button__outline w-100 '>
                                      <Link to="/signup" className='text-decoration-none text-warning ' >
                                        Sign up
                                      </Link>
                                    </button> */}
                                    <Link  to="/signup" className='text-decoration-none text-light' >
                                       <button className='btn_all_web w-100 '>
                                          Sign up
                                          </button>
                                      </Link> 
                                    </DropdownItem>
                                  
                                  </DropdownMenu>
                                </Dropdown>
                                    
                              }
                             {carts.userInfo && carts.userInfo.isAdmin && (
                              <Dropdown isOpen={dropdownOpen2} toggle={toggle2}   className='navbar_up_border' >
                                 <DropdownToggle caret size="sm" className=' bg-white  text-dark border-0 ' >
                                      ADMIN
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem header>
                                      <Link to="/dashboard" className='text-decoration-none text-secondary'>
                                         Dashboard
                                      </Link>
                                    </DropdownItem>
                                    {/* <DropdownItem header>
                                      <Link to="/userInfo" className='text-decoration-none text-secondary'>
                                        User Profile
                                      </Link>
                                    </DropdownItem>
                                    <DropdownItem header>
                                      <Link to="/orderlist" className='text-decoration-none text-secondary'>
                                        Orders
                                      </Link>
                                    </DropdownItem> */}
                                    <DropdownItem header>
                                      <Link to="/post-product" className='text-decoration-none text-secondary'>
                                       Post Product
                                      </Link>
                                    </DropdownItem>
                                    <DropdownItem header>
                                      <Link to="/post-blog" className='text-decoration-none text-secondary'>
                                       Post Blog
                                      </Link>
                                    </DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                             ) }
                </NavItem>
              </Nav>
      
         
        </Navbar>
        <div  ref={navRef} className={fix ? "sticky_nav nav_under_cover": "nav_under_cover"}>
         
         <div className=' d-flex justify-content-start align-items-center p-3 '>
            <div className=' nav_item '>
            <NavLink to='/' className='text-decoration-none '>
                   Home
              </NavLink>
            </div>
            <div className=' nav_item ' >
            <NavLink to='/search' className='text-decoration-none '>
                   Product
              </NavLink>
            </div>
           
            <div className=' nav_item ' >
              <NavLink to='/blog' className='text-decoration-none '>
                   Blog
              </NavLink>
            </div>
            <div className=' nav_item ' >
            <NavLink to='/cart' className='text-decoration-none '>
                   Cart
              </NavLink>
            </div>
            <div className=' nav_item ' >
              <NavLink to='/about' className='text-decoration-none '>
                   About 
              </NavLink>
            </div>
            <div className=' nav_item ' >
             < NavLink to='/introduce' className='text-decoration-none '>
                   Contact
              </NavLink>
            </div>
         </div>
        </div>
    </div>
  )
}

export default NavComponent
