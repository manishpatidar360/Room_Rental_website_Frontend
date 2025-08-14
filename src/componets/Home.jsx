import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { requestData } from '../../services/api';
import Cards from './Cards';

export default function Home() {
    const initialListings = useLoaderData();
    const [listings, setListings] = useState(initialListings || []);


    useEffect(() => {
        if (!initialListings || initialListings.length === 0) {
            requestData().then((data) => {
                setListings(data);
            }).catch((error) => {
                console.error("Error fetching listings:", error);
            });
        }
    }, []);

   
    return (
        <div >            
                <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
                {listings ? (
                    listings.map((listing) => (
                        
                            <Cards key={listing._id} listing={listing}/>
                        
                    ))
                ) : (
                    <p>No listings available.</p>
                )}
            
            </div>
        </div>
    )
}
