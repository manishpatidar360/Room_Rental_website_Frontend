import React, { useContext, useEffect, useState } from 'react';
import { deleteCard, requestHomeCardDetail, reviewDelete } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import "./HomeCardDetail.css";
import ReviewsForm from './ReviewsForm';
import { MyContext } from '../contexts/MyProvider';


export default function HomeCardDetail() {
    const{formData, setFormData} =useContext(MyContext);
    
  const navigate = useNavigate();
  const [listing, setListing] = useState({ review: [] , owner: {}});
  const { listing_id } = useParams();
  const {userid}=useContext(MyContext);
  useEffect(() => {
         window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
    async function fetch() {
      if (listing_id) {
        const response = await requestHomeCardDetail(listing_id);
         console.log(response);
        setListing(response);
       
      }
    }
    fetch();    
  }, [listing_id,]);

  console.log(`listing owner id ${listing.owner._id}`);
  console.log(listing);
  console.log(`userid ${userid}`)

  const handleDelete = async (listing_id) => {
    const result = await deleteCard(listing_id);
    if (result.status === 200) {
      navigate("/");
    }
  };

  const handleDeleteReviews=async(review_id)=>{
   await reviewDelete(listing_id ,review_id);
   setListing((preListing)=>{
    return(
      {
        ...preListing, review:preListing.review.filter((curReview)=>{
          return curReview._id != review_id;
        })
      }
    )
   })
   }

  return (
    <>
      <div className='row mt-3 mb-3'>
        <div className='col-8 offset-3'>
          <h3>{listing.title}</h3>
        </div>
        <div className="card col-6 offset-3 " style={{border:"none"}}>
          <img src={listing.image?.url} className="card-img-top  show-img" alt="..." />
          <p className='mb-0'>owned By {listing.owner.username} </p>
          <div className="card-body p-2 ">
            <p className="card-text">
              {listing.description} <br />
              &#8377;{listing.price} <br />
              {listing.country} <br />
              {listing.location} <br />
            </p>
          </div>
        </div>
       {/* {listing.owner._id===userid && (  */}
        <div className='btns '>
          <button className='btn btn-dark  offset-3 addbutton ' onClick={() => navigate(`/editDetail/${listing_id}`)}>Edit</button>
          <button className='btn btn-dark  offset-3 ' onClick={() => handleDelete(listing_id)}>Delete</button>
        </div>
       {/* )}  */}
      </div>

      <ReviewsForm listingId={listing_id} formData={formData} setFormData={setFormData} setListing={setListing} />
      <br />
     

      <div className='col-8 offset-3'>
      <hr />
      <h4>All reviews</h4>
      {listing.review.length > 0 ? (
        
           <div className='row '>
          {listing.review.map((review ) => (
            <div className='card col-5 ms-3 mb-3 CustomLinkDecoration' key={review._id} >
              <div className='card-body'>
                <h5 className='card-title'>{review.reviewAuthor.username}</h5>
              <p class="starability-result" data-rating={review.rating}></p>
              <p className='card-text'>comment: {review.comment}</p>
              {review.reviewAuthor._id===userid && 
              <button className='btn btn-dark' onClick={()=>handleDeleteReviews(review._id)}>Delete</button>
                   }
              </div>
            </div>
           
          ))}
           </div>
        
      ) : (
        <p>No reviews yet.</p>
      )}
      </div>
    </>
  );
}
