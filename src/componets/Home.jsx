import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { requestData } from '../../services/api';
import Cards from './Cards';
import Slider_component from './Slider_component';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import './Home.css'

export default function Home() {
    const initialListings = useLoaderData();
    const [listings, setListings] = useState(initialListings || []);

    useEffect(() => {
        if (!initialListings || initialListings.length === 0) {
            requestData()
                .then((data) => setListings(data))
                .catch((error) => console.error("Error fetching listings:", error));
        }
    }, []);

    return (
        <>
            {/* Hero / Top Slider */}
            <Slider_component />

            {/* Listings Slider */}
            <div className="listings-section">
                <div style={{padding:"20px"}}>
                <p className='par'>Curated especially for you</p>
                    <p className='parr'>Recommended properties</p>
                    </div>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={4.2}
                    navigation
                    breakpoints={{
                        1200:{slidesPerView:4.2},
                        1024: { slidesPerView: 3 }, // Desktop
                        768: { slidesPerView: 2 },  // Tablet
                        480: { slidesPerView:1 },
                        0:{ slidesPerView: 1},
                    }}
                >
                    {listings.map((listing) => (
                        <SwiperSlide key={listing._id}>
                            <div className="room-card">
                                <Cards listing={listing} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className='third-div'>
                <div className='inside'>
                <div className='inner-heading' style={{fontSize:"2.5rem",lineHeight:"2.5rem",padding:"0px 20px 0px 20px"}}>Where comfort meets</div>
                <div className="inner-heading"style={{fontSize:"2.5rem",padding:"0px 20px 0px 20px"}}>your lifestyle</div>
                <div style={{padding:"0px 20px 0px 20px",marginTop:"20px",fontSize:"1.2rem", color:"#010205", fontWeight:"1oo",opacity:"0.6"}}>With diverse housing options, you're not just choosing a home; you're crafting a lifestyle that reflects your individuality. Beyond mere renting, we're here to support your everyday living, hassle-free.</div>
                </div>
            </div>

            <div className='slider_conatiner new_container'>
        <div className='text_container'>
         <h1 className='heading_container new_heading'>Are you looking for Premium Properties?</h1>
         <p className='para'>View and book your appointment with our partners </p>
         <button className='btnss'>view properties</button>
        </div>
         
        <div className='image_containerr'>
            <div className='image1'>
         <img alt="rental_image" src="/room1.jpg"/>
         </div>
          <div className='image1 image2'>
         <img alt="rental_image" src="/room2.jpg"/>
         </div>
        </div>

    </div>
        </>
    )
}
