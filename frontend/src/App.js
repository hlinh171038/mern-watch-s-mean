import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'

// components
//pages
import ProductPages from './pages/ProductPages';
import DetailPages from './pages/DetailPages';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import ShippingAdress from './pages/ShippingAdress';
import SignUpPage from './pages/SignUpPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import ProtectAdmin from './components/ProtectAdmin';
import PostProduct from './pages/PostProduct';
import BlogsPage from './pages/BlogsPage';
import PostBlogPage from './pages/PostBlogPage';
import BlogDetail from './pages/BlogDetail';
import AboutUsPage from './pages/AboutUsPage';
import IntroducePage from './pages/IntroducePage';
import UserInfoPage from './pages/UserInfoPage';
import DetailHistoryComponent from './components/DetailHistoryComponent';
import DetailHistoryPage from './pages/DetailHistoryPage';
import BllogEditPage from './pages/BllogEditPage';

function App() {
  console.log(process.env.REACT_APP_API)
  return (
    <Routes>
      <Route path="/" element={<ProductPages/>}/>
      <Route path="/product/:slug" element={<DetailPages/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route path='/signin' element={<SignInPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path="/shipping" element={<ShippingAdress/>}/>
      <Route path="/payment" element={<PaymentPage/>}/>
      <Route path="/placeorder" element={<PlaceOrderPage/>}/>
      <Route path="/blog" element={<BlogsPage/>}/>
      <Route path="/blog/:id" element={<BlogDetail/>}/>
      <Route path="/about" element={<AboutUsPage/>}/>
      <Route path="/introduce" element={<IntroducePage/>}/>
       <Route path="/placeorder/order/:id" element={<ProtectedRoute>
                                                      <OrderDetailPage/>
                                                    </ProtectedRoute>}/>
      <Route path="/orderhistory" element={<ProtectedRoute>
                                              <OrderHistoryPage/>
                                            </ProtectedRoute>}/>
      <Route path="/profile" element={<ProtectedRoute>
                                        <UpdateProfilePage/>
                                      </ProtectedRoute>}/>
      <Route path="/search" element={<SearchPage/>}/>
      {/**ADMIN ROUTE */}
      {/* <Route path="/dashboard" element ={<ProtectAdmin>
                                            <DashboardPage/>
                                          </ProtectAdmin>}/> */}
      <Route path='/post-product' element={<ProtectAdmin>
        <PostProduct/>
      </ProtectAdmin>}/>
      <Route path='/post-blog' element={<ProtectAdmin>
        <PostBlogPage/>
      </ProtectAdmin>}/>
      <Route path='/dashboard' element={<ProtectAdmin>
        <UserInfoPage/>
      </ProtectAdmin>}/>
      <Route path='/dashboard/:id' element={<ProtectAdmin>
        <DetailHistoryPage/>
      </ProtectAdmin>}/>
      <Route path='/edit/:id' element ={<ProtectAdmin>
        <BllogEditPage/>
      </ProtectAdmin>}/>
     
    </Routes>
  );
}

export default App;
