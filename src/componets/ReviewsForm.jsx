import React, { useContext, useRef, useState } from 'react'
import { reviewData } from '../../services/api';
import { MyContext } from '../contexts/MyProvider';
import "./ReviewsForm.css"

export default function ReviewsForm({ listingId, formData, setFormData, setListing }) {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);

  const handleData = (evt) => {
    evt.preventDefault();
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = formRef.current;
    if (form && !form.checkValidity()) {
      evt.preventDefault();
      evt.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    const newReview = await reviewData(listingId, formData);
    setListing((prevValue) => ({
      ...prevValue,
      review: [...prevValue.review, newReview.data]
    }));

    setFormData({ ...formData, comment: "" });
    setValidated(false);
  }

  return (
    <div className='col-12 col-md-8 offset-md-3'>
      <hr />
      <h1>Leave a Review</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        ref={formRef}
        className={validated ? 'was-validated' : ''}
      >
        {/* Rating */}
        <fieldset className="starability-slot">
          <legend>First rating:</legend>

          <input type="radio" id="first-rate1" name="rating" value="1"
            checked={formData.rating === "1"} onChange={handleData} />
          <label htmlFor="first-rate1" title="Terrible">1 star</label>

          <input type="radio" id="first-rate2" name="rating" value="2"
            checked={formData.rating === "2"} onChange={handleData} />
          <label htmlFor="first-rate2" title="Not good">2 stars</label>

          <input type="radio" id="first-rate3" name="rating" value="3"
            checked={formData.rating === "3"} onChange={handleData} />
          <label htmlFor="first-rate3" title="Average">3 stars</label>

          <input type="radio" id="first-rate4" name="rating" value="4"
            checked={formData.rating === "4"} onChange={handleData} />
          <label htmlFor="first-rate4" title="Very good">4 stars</label>

          <input type="radio" id="first-rate5" name="rating" value="5"
            checked={formData.rating === "5"} onChange={handleData} />
          <label htmlFor="first-rate5" title="Amazing">5 stars</label>
        </fieldset>

        <br /><br />

        {/* Comments */}
        <label htmlFor='comment' className="form-label">Comments</label>
        <textarea
          name='comment'
          id='comment'
          cols={30}
          rows={5}
          className="form-control"
          value={formData.comment}
          onChange={handleData}
          required
        ></textarea>
        <div className='invalid-feedback'>Please add some comments for reviews</div>

        <br />
        <button className='btn btn-outline-dark'>Submit</button>
      </form>
    </div>
  )
}
