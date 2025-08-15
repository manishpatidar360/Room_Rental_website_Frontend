import axios from "axios";
import React from "react";
import {  toast } from 'react-toastify';


const URL="http://localhost:3000";

const getToken=()=>{
    const token= localStorage.getItem("token");
    return token;
}

export const requestData=async()=>{
    const token=getToken();
    const response=await axios.get(`${URL}/listing`,{
        headers:{
            Authorization: token ? `Bearer ${token}`:"",
  }  });
    return response.data;
}

export const requestHomeCardDetail=async(id)=>{
    const token=getToken();
    const response=await axios.get(`${URL}/listing/${id}`,{
        headers:{
            Authorization: token ? `Bearer ${token}`:"",
        },
    } );
    console.log(JSON.stringify(response.data));
     return response.data;
}

export const reviewData=async(id,data)=>{
    const token=getToken();
    try{
    const response=await axios.post(`${URL}/listing/${id}/reviews`, data, {
        headers:{
            Authorization: token ? `Bearer ${token}`:"",
        }})
    return response;
    }catch(error){
     console.log(`reviews error${error}`);
    }
}

export const reviewDelete=async(id,review_id)=>{
    const token=getToken();
    try{
 const response=await axios.delete(`${URL}/listing/${id}/reviews/${review_id}`,{
    headers:{
        Authorization: token ? `Bearer ${token}`:"",
    }});
 return response;
    }catch(error){
        console.log('error in delete reviews');
    }
}

export const newListing=async(data)=>{
  const token=getToken();
  console.log(data);
    try{
    const response=await axios.post(`${URL}/listing/new`, data, {
        headers:{
            Authorization: token ? `Bearer ${token}`:"",
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
    }catch(error){
        console.log(error);
     if(error.response){
        // console.log(`hello error${error.response.data.details[0].message}`);
        alert(error.response.data.msg)
        // throw new Error(error.response.data.details[0].message);
     }else{
        throw new Error("somthing went wrong");
     }
    }
}

export const editData=async(id,data)=>{
    try{
    const token=getToken();
 const response=await axios.put(`${URL}/listing/editDetail/${id}`, data,{
    headers:{
        Authorization: token ? `Bearer ${token}`:"",
    }});
    
    console.log(response); 
    if(response.status===200){
        toast.success("edit successfully");
    }
 return response.data;
}catch(err){
    toast.error(err.response.data.message);
}
}

export const deleteCard=async(id)=>{
    try{
    const token=getToken();
    console.log(token);
    const response=await axios.delete(`${URL}/listing/deleteCard/${id}`,{
        headers:{
            Authorization: token ? `Bearer ${token}`:"",
        },
    } );

        console.log(response)
    
    return response;
}catch(err){
    toast.error(err.response.data.message);
}
}

// singup login 

export const singupdata=async(data)=>{
    
    const response= await axios.post(`${URL}/user/singup`,data);
    return response;
}
export const logindata=async(data)=>{
    const response= await axios.post(`${URL}/user/login`,data);
    return response;
}
