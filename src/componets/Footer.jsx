import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
  return (
    <div className="card text-center mycustum w-100">
      <h3 className=" fw-bold  text-center" style={{ color: "#DC143C ", marginBottom: "0px" }}>Follow Us </h3>
  <div className="card-header">
  <FaInstagram /> &nbsp; &nbsp;
  <BsWhatsapp />&nbsp; &nbsp;
  <IoLogoFacebook />

  </div>
  <div className="card-body p-0 ">
    <h5 className="card-title p-0 ">&copy; WonderNest Private Limited</h5>
    <p className="card-text p-0">Email: contact@wonderNest.com | Phone: +91 xxxxxxxxxx</p>
  </div>
  <div className="card-footer text-body-secondary p-0">
  <p>"Explore the world with WonderNest!"</p>
  </div>
</div>

  )
}
