import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImHome } from "react-icons/im";
import './Navbar.css'
import { MyContext } from '../contexts/MyProvider';

export default function Navbar() {
  const {token,setToken}=useContext(MyContext);
   
  const handleClick=()=>{
    localStorage.setItem("token","");
    setToken("");
  }

   useEffect(()=>{
    setToken(localStorage.getItem("token"));
  },[token,setToken])


  return (
    
    <nav className="navbar navbar-expand-lg bg-body-light border-bottom fixed-top mt-70">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><ImHome /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link " aria-current="page" to="/">Home</Link>
        <Link className="nav-link" to="/addForm">Add new Listing</Link>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </div>
      <div className="navbar-nav ms-auto">
        { token===""?( <>
        <Link className="nav-link " aria-current="page" to="/singup">Sing up</Link>
        <Link className="nav-link" to="/login">Log in</Link>
        </> ) : (
        <Link className="nav-link" onClick={handleClick}>Log out</Link>
         )
}
      </div>
    </div>
  </div>
</nav>
  )
}
