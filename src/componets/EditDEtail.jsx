import React, { useEffect, useRef, useState } from 'react'
import { Form, useActionData, useNavigate, useParams } from 'react-router-dom'
import { requestHomeCardDetail } from '../../services/api';

export default function EditDEtail() {
    const action=useActionData();
  const navigate= useNavigate();
    const[data, setData]=useState({});
    const{listing_id}=useParams();
    const formRef = useRef();
    const [validated, setValidated] = useState(false);

    useEffect(()=>{
        if (action?.success) {
        console.log("✅ Form submitted successfully! Redirecting...");
        navigate("/");
    }
        async function fetch() {
           const response = await requestHomeCardDetail(listing_id);
           console.log(JSON.stringify(response));
           setData(response);
           
        }
       fetch();        
    },[action,navigate])

   

    console.log(`response is ${JSON.stringify(data)}`)
    const handleData=(evt)=>{
     evt.preventDefault();
     setData({...data, [evt.target.name]:evt.target.value });
    }

    const handleSubmit = (event) => {
      const form = formRef.current;
      if (form && !form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
      }
      setValidated(true); //  Apply Bootstrap validation styles
  };
  return (
    <div className='content-container'>
       <div className='row'>
       <div className='col-8 offset-2' >
        <h1>Edit Detail</h1>
        <Form method="post" action={`/editDetail/${listing_id}`} noValidate ref={formRef} onSubmit={handleSubmit} className={validated ? 'was-validated' : ''} >
         <div className='mb-3'>
         <label htmlFor='title' className='form-lable'>Title</label>
         <input type="text" placeholder="enter titile" value={data.title} onChange={handleData} name="title" className='form-control' required/>
         <div className='valid-feedback'>title lookes good!</div>
         <div className="invalid-feedback">Please enter a title.</div>
         </div>

         <div className='mb-3'>
         <label htmlFor='description' className='form-lable'>Description</label>
         <textarea type="text" placeholder="enter description" value={data.description} onChange={handleData} name="description" className='form-control' required></textarea>
         <div className="valid-feedback">Description is valid!</div>
         <div className="invalid-feedback">Please enter a description.</div>
         </div>

         <div className='mb-3'>
        <label htmlFor='image' className='form-lable'>Image</label>
        <input type="file" placeholder="enter image url" onChange={handleData} name="image" className='form-control' />
        </div>

        <div className='row'>
        <div className='mb-3 col-4' >
        <label htmlFor='price' className='form-lable'>Price</label>
        <input  placeholder="enter price" value={data.price} onChange={handleData} name="price" className='form-control' required />
        <div className="valid-feedback">Price is valid!</div>
        <div className="invalid-feedback">Please enter a valid price.</div>
        </div>

        <div className='mb-3 col-8'>
        <label htmlFor='country' className='form-lable'>Country</label>
        <input type="text" placeholder="enter country name" value={data.country} onChange={handleData} name="country" className='form-control' required/>
        <div className="valid-feedback">Country looks good!</div>
        <div className="invalid-feedback">Please enter a country name.</div>
        </div >

        </div>

        <div className='mb-3'>
        <label htmlFor='location' className='form-lable'>Location</label>
        <input type="text" placeholder="enter location" value={data.location} onChange={handleData} name="location" className='form-control' required/>
        <div className="valid-feedback">Location is valid!</div>
        <div className="invalid-feedback">Please enter a location.</div>
        </div>
        <button className='btn btn-dark addbutton mt-3'>Edit</button>
        <br></br> <br></br>
    </Form>
    </div>
    </div>
    </div>
  )
}
