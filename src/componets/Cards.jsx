import React from 'react';
import styles from './Cards.module.css';
import { Link } from 'react-router-dom';

export default function Cards({ listing }) {
  return (
    <Link to={`/listingDetail/${listing._id}`} className={styles.listingLink}> 
      <div className={`card ${styles.card}`}>
        <img 
          src={listing.image.url} 
          className={`card-img-top ${styles.cardImgTop}`} 
          alt="listing" 
        />
        <div className={`card-img-overlay ${styles.cardImgOverlay}`}></div>

        <div className={`card-body ${styles.cardBody}`}>
          <p className={styles.cardText}>
            <b>{listing.title}</b> <br />
            For: Boys, Girls, Family
          </p>

          <div className={styles.cardDetails}>
            <div>
              <b>₹ {listing.price}</b>
              <span>Rent/month</span>
            </div>
            <div>
             <div>WiFi Available</div>
             <span>₹1000/month</span>
            </div>
            <div>
              <div>Parking </div>
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
