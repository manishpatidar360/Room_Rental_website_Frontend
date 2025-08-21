import React from 'react'
import './Slider_component.css';

export default function Slider_component() {
  return (
    <div className='slider_conatiner'>
        <div className='text_container'>
         <h1 className='heading_container'>Find Your Perfect Room, Anytime, Anywhere</h1>
         <p className='para'>Easy search, trusted listings & affordable rentals Book in minutes with comfort & trust Simple process, secure booking, happy living.. </p>
         <button className='btnss'>Book Now</button>
        </div>
         
        <div className='image_container'>
         <img alt="rental_image" src="\rent-agreement.svg"/>
        </div>

    </div>
  )
}


