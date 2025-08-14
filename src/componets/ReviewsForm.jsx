import React, { useContext, useRef, useState } from 'react'
import { reviewData } from '../../services/api';
import { useParams } from 'react-router-dom';
import { MyContext } from '../contexts/MyProvider';
import "./ReviewsForm.css"
export default function ReviewsForm({listingId, formData , setFormData, setListing}) {
  const formRef = useRef();
     const [validated, setValidated] = useState(false);

    const handleData=(evt)=>{
        evt.preventDefault();
       setFormData({...formData, [evt.target.name]: evt.target.value})
    }
    const handleSubmit=async(evt)=>{
        evt.preventDefault();
        // console.log(`formData is ${JSON.stringify(formData)}`);
        const form = formRef.current;
        if (form && !form.checkValidity()) {
            evt.preventDefault();
            evt.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(true); //  Apply Bootstrap validation styles
      const newReview= await reviewData(listingId, formData);
      console.log(`new review`);
      console.log(newReview)
       setListing((preValue)=>{
        return(
          {...preValue, review:[...preValue.review, newReview.data]}
        )
       })
        setFormData({
          ...formData, comment:""
        });
        setValidated(false)

    }
  return (
    <div className='col-8 offset-3'>
        <hr></hr>
        <h1>Leave a Review</h1>
        
        <form onSubmit={handleSubmit} noValidate ref={formRef}  className={validated ? 'was-validated' : ''}>
         {/* <label htmlFor='rating' className="form-lable">Rating</label>
         <input type='range' min={1} max={5} id='rating' name='rating' className='form-range' value={formData.rating} onChange={handleData} /> */}
        <fieldset className="starability-slot">
          <legend>First rating:</legend>
         
          <input type="radio" id="first-rate1" name="rating" value="1" checked={formData.rating === "1"} onChange={handleData} />
         <label htmlFor="first-rate1" title="Terrible">1 star</label>
         <input type="radio" id="first-rate2" name="rating" value="2" checked={formData.rating === "2"} onChange={handleData}/>
          <label htmlFor="first-rate2" title="Not good">2 stars</label>
         <input type="radio" id="first-rate3" name="rating" value="3" checked={formData.rating === "3"} onChange={handleData}/>
         <label htmlFor="first-rate3" title="Average">3 stars</label>
        <input type="radio" id="first-rate4" name="rating" value="4"checked={formData.rating === "4"}  onChange={handleData}/>
        <label htmlFor="first-rate4" title="Very good">4 stars</label>
        <input type="radio" id="first-rate5" name="rating" value="5" checked={formData.rating === "5"} onChange={handleData}/>
         <label htmlFor="first-rate5" title="Amazing">5 stars</label>
         
  </fieldset>
          <br></br>
          <br/>
         <label htmlFor='comment' className="form-lable">Comments</label>
         <textarea name='comment' id='comment' cols={30} rows={5} className="form-control" value={formData.comment} onChange={handleData} required></textarea>
         <div className='invalid-feedback'>pls add some comments htmlFor reviews</div>
         <br></br>
         <button className='btn btn-outline-dark ' >submit</button>
        </form>
    </div>
  )
}

