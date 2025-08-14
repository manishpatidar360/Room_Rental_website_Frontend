import React, { useEffect } from 'react';
import styles from './Cards.module.css'; // ✅ Import CSS Modules
import { Link, useNavigate } from 'react-router-dom';

export default function Cards({ listing }) {
  console.log(listing);
 
  return (
    <Link to={`/listingDetail/${listing._id}`} className={styles.listingLink} > 
      <div className={`card col ${styles.card}`}>
        <img 
          src={listing.image.url} 
          className={`card-img-top ${styles.cardImgTop}`} 
          alt="..." 
          style={{ height: "20rem" }}
        />
        <div className={`card-img-overlay ${styles.cardImgOverlay}`}></div>
        <div className={`card-body ${styles.cardBody}`}>
          <p className={`card-text ${styles.cardText}`}>
            <b>{listing.title}</b> <br />
            &#8377;{listing.price}/Night
          </p>
        </div>
      </div>
    </Link>
  );
}
