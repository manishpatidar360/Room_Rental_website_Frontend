import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import "./LogIn.css"
import { MyContext } from '../contexts/MyProvider';

export default function LogIn() {
    const navigate = useNavigate();
    const actionData = useActionData();
    const formRef = useRef();
    const [validated, setValidated] = useState(false);
    const {storeToken}=useContext(MyContext);
    const {setToken}=useContext(MyContext);
    const { setUserid}=useContext(MyContext);
    

     useEffect(() => {
            if (actionData?.success) {
                const token=actionData.data.data.token;
                setUserid(actionData.data.data.userid);
                localStorage.setItem("userid", actionData.data.data.userid);
                storeToken(token);
               setToken(token)
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
    <div className='bodybox'>
    <div className='p-4 Login-container'>
        <h1 className='mb-4 ' style={{fontFamily:"revert-layer"}}>Log in </h1>
         <Form method="post" action="/login" noValidate ref={formRef} onSubmit={handleSubmit} className={validated ? 'was-validated' : ''}>
                            <div className="mb-3 col-8 costum">
                                <label htmlFor="username" className="form-lable">username</label>
                                <input type="text" placeholder="Enter username" name="username" className="form-control" required />
                                
                            </div>
                           
                            <div className="mb-3 col-8 costum">
                                <label htmlFor="password" className="form-lable">password</label>
                                <input type="password" placeholder="Enter password" name="password" className="form-control" required />
                                
                            </div>
        
                            <br />
                    <button className="btn btn-dark col-8 logbtn " type="submit" >Log in</button>
                    <br /><br />

                            </Form>
    </div>
    </div>
  )
}
