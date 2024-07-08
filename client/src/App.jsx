import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Routes, Route } from "react-router-dom";
import AllBook from './pages/AllBook';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ViewBookDetails from './pages/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Favourites from './Components/Profile/Favourites';
import UserOrderHistory from './Components/Profile/UserOrderHistory';
import Setting from './Components/Profile/Setting';


function App() {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("role") && localStorage.getItem("token")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
  }, [])


  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/all-books' element={<AllBook />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/profile' element={<Profile />} >
          <Route index element={<Favourites />} />
          <Route path='/profile/orderHistory' element={<UserOrderHistory />} />
          <Route path='/profile/setting' element={<Setting />} />
        </Route>
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/signin' element={<SignIn />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App