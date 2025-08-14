import React, { useEffect, useRef, useState } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import './Singup.css';

export default function SingUp() {
    const navigate = useNavigate();
    const actionData = useActionData();
    const formRef = useRef();
    const [validated, setValidated] = useState(false);

     useEffect(() => {
            if (actionData?.success) {
                navigate('/login'); //  Navigate after successful form submission
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
    <div className='bodybox'>
    <div className='col-4 offset-4 signup-container'>
        <h1 className='mb-4 ' >Sing Up </h1>
         <Form method="post" action="/singup" noValidate ref={formRef} onSubmit={handleSubmit} className={validated ? 'was-validated' : ''}>
                            <div className="mb-3 col-8">
                                <label htmlFor="username" className="form-lable">username</label>
                                <input type="text" placeholder="Enter username" name="username" className="form-control" required />
                                
                            </div>
                            <div className="mb-3 col-8">
                                <label htmlFor="email" className="form-lable">Email</label>
                                <input type="email" placeholder="Enter Email" name="email" className="form-control" required />
    
                            </div>

                            <div className="mb-3 col-8">
                                <label htmlFor="password" className="form-lable">password</label>
                                <input type="password" placeholder="Enter password" name="password" className="form-control" required />
                                
                            </div>
        
                            <br />
                    <button className="btn btn-dark singupbtn col-8" type="submit" >Sing up</button>
                    <br /><br />

                            </Form>
    </div>
    </div>
  )
}
