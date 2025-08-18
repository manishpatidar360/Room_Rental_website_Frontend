import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { MyContext } from '../contexts/MyProvider'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const {token}=useContext(MyContext);
    const navigate=useNavigate();
    useEffect(()=>{
     if(!token){
        navigate("/login");
     }
    },[])
  return (
    <div>Dashboard</div>
  )
}
