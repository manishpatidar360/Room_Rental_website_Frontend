import React from 'react'
import Home from './componets/Home'
import { Outlet } from 'react-router-dom'
import Navbar from './componets/Navbar'
import Footer from './componets/Footer'
import "./App.css";
import "./index.css"
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div className='app'>
       <ToastContainer />
      <Navbar />
      
        <Outlet />
      
      <Footer  />
    </div>
  )
}
