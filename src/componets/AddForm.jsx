import React, { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import './AddForm.css';


export default function AddForm() {
    const navigate = useNavigate();
    const actionData = useActionData();
    const formRef = useRef();
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/login');
          }

        if (actionData?.success) {
            navigate('/'); //  Navigate after successful form submission
        }
    }, [actionData, navigate]);

   

    const handleSubmit = (event) => {
        const form = formRef.current;
        if (form && !form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true); //  Apply Bootstrap validation styles
    };

    return (
        <div className="row ">
            <div className="col-8 offset-2 ">
                <br />
                <h1>Create a New Listing</h1>
                <Form method="post" action="/addForm"  enctype="multipart/form-data" noValidate ref={formRef} onSubmit={handleSubmit} className={validated ? 'was-validated' : ''}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-lable">Title</label>
                        <input type="text" placeholder="Enter title" name="title" className="form-control" required />
                        <div className='valid-feedback'>title lookes good!</div>
                        <div className="invalid-feedback">Please enter a title.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-lable">Description</label>
                        <textarea type="text" placeholder="Enter description" name="description" className="form-control" required />
                        <div className="valid-feedback">Description is valid!</div>
                        <div className="invalid-feedback">Please enter a description.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-lable">Image</label>
                        <input type="file" placeholder="Enter image URL" name="image" className="form-control" />
                    </div>

                    <div className="row">
                        <div className="mb-3 col-4">
                            <label htmlFor="price" className="form-lable">Price</label>
                            <input type="number" placeholder="Enter price" name="price" className="form-control" required />
                            <div className="valid-feedback">Price is valid!</div>
                            <div className="invalid-feedback">Please enter a valid price.</div>
                        </div>

                        <div className="mb-3 col-8">
                            <label htmlFor="country" className="form-lable">Country</label>
                            <input type="text" placeholder="Enter country name" name="country" className="form-control" required />
                            <div className="valid-feedback">Country looks good!</div>
                            <div className="invalid-feedback">Please enter a country name.</div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="location" className="form-lable">Location</label>
                        <input type="text" placeholder="Enter location" name="location" className="form-control" required />
                        <div className="valid-feedback">Location is valid!</div>
                        <div className="invalid-feedback">Please enter a location.</div>
                    </div>

                    <br />
                    <button className="btn btn-dark addbutton" type="submit">Add</button>
                    <br /><br />
                </Form>
            </div>
        </div>  
    );
}
