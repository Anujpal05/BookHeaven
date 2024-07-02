import React from 'react'
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Routes, Route } from "react-router-dom";
import AllBook from './pages/AllBook';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/all-books' element={<AllBook />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/signin' element={<SignIn />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
