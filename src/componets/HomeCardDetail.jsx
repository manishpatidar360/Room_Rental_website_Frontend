import React, { useContext, useEffect, useState } from 'react';
import { backendVarify, createOrder, deleteCard, requestHomeCardDetail, reviewDelete } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import "./HomeCardDetail.css";
import ReviewsForm from './ReviewsForm';
import { MyContext } from '../contexts/MyProvider';

export default function HomeCardDetail() {
  const { formData, setFormData, userid } = useContext(MyContext);
  const navigate = useNavigate();
  const [listing, setListing] = useState({ review: [], owner: {} });
  const { listing_id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
    async function fetch() {
      if (listing_id) {
        const response = await requestHomeCardDetail(listing_id);
        setListing(response);
      }
    }
    fetch();
  }, [listing_id, navigate]);

  const handlePayment = async (listing_id) => {
    try {
      // 🔹 Step 1: Backend se order banao
      const { data } = await createOrder(listing_id);

      // 🔹 Step 2: Razorpay checkout options
      const options = {
        key: data.key,   
        amount: data.order.amount,
        currency: "INR",
        name: "WonderNest - Room Booking",
        description: "Room Booking Payment",
        order_id: data.order.id,  // backend se mila orderId
        handler: async function (response) {
          // 🔹 Step 3: Backend ko verify bhejo
          const verify = await backendVarify(response, listing_id);

          if (verify.data.success) {
            alert("✅ Payment Successful & Verified");
            // yaha booking MongoDB me save karna hoga
          } else {
            alert("❌ Payment Verification Failed");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      // 🔹 Step 4: Payment popup open karo
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (listing_id) => {
    const result = await deleteCard(listing_id);
    if (result.status === 200) {
      navigate("/");
    }
  };

  const handleDeleteReviews = async (review_id) => {
    await reviewDelete(listing_id, review_id);
    setListing((prevListing) => ({
      ...prevListing,
      review: prevListing.review.filter((curReview) => curReview._id !== review_id)
    }));
  };

  return (
    <>
      <div className='row mt-3 mb-3'>

        {/* Title */}
        <div className='col-12 col-md-8 offset-md-3'>
          <h3>{listing.title}</h3>
        </div>

        {/* Image & Details */}
        <div className="card pt-2  col-12 col-md-6 offset-md-3" style={{ border: "none" }}>
          <img src={listing.image?.url} className="card-img-top show-img" alt="..." />
          <p className='mb-0'>owned By {listing.owner.username} </p>
          <div className="card-body p-2">
            <p className="card-text">
              {listing.description} <br />
              &#8377;{listing.price} <br />
              {listing.country} <br />
              {listing.location} <br />
            </p>
            { 
            (listing.status=="Available")?(
            <button className='btn bookbtn' onClick={()=>handlePayment(listing_id)}>Book</button>
             ):(
              <div>Room not available </div>
             )
            }
          </div>
        </div>

        {/* Owner Buttons */}
        {listing.owner._id === userid && (
          <div className='btns mt-2 col-12 col-md-8 offset-md-3'>
            <button
              className='btn btn-dark me-2 addbutton'
              onClick={() => navigate(`/editDetail/${listing_id}`)}
            >
              Edit
            </button>
            <button
              className='btn btn-dark'
              onClick={() => handleDelete(listing_id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Review Form */}
      <ReviewsForm
        listingId={listing_id}
        formData={formData}
        setFormData={setFormData}
        setListing={setListing}
      />

      <br />

      {/* All Reviews */}
      <div className='col-12 col-md-8 offset-md-3'>
        <hr />
        <h4>All reviews</h4>
        {listing.review.length > 0 ? (
          <div className='row'>
            {listing.review.map((review) => (
              <div
                className='card col-12 col-sm-5 ms-sm-3 mb-3 CustomLinkDecoration'
                key={review._id}
              >
                <div className='card-body'>
                  <h5 className='card-title'>{review.reviewAuthor?.username}</h5>
                  <p className="starability-result" data-rating={review.rating}></p>
                  <p className='card-text'>comment: {review.comment}</p>
                  {review.reviewAuthor?._id === userid && (
                    <button
                      className='btn btn-dark'
                      onClick={() => handleDeleteReviews(review._id)}
                    >
                      Delete
                    </button>
                  )}
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
