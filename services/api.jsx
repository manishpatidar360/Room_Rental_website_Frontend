import axios from "axios";
import React from "react";
import {  toast } from 'react-toastify';

const axiosInstance=axios.create({
   baseURL:" http://localhost:3000"
})
axiosInstance.interceptors.request.use(
    (config)=>{
       const token= localStorage.getItem("token");
       if(token){
        config.headers.Authorization=`Bearer ${token}`;
       }
       return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

// const URL=import.meta.env.VITE_API_URL;

const getToken=()=>{
    const token= localStorage.getItem("token");
    return token;
}

export const requestData=async()=>{
    const response=await axiosInstance.get(`listing`);
    return response.data;
}

export const requestHomeCardDetail=async(id)=>{
    const response=await axiosInstance.get(`listing/${id}`);
    console.log(JSON.stringify(response.data));
     return response.data;
}

export const reviewData=async(id,data)=>{
    try{
    const response=await axiosInstance.post(`listing/${id}/reviews`, data)
    return response;
    }catch(error){
     console.log(`reviews error${error}`);
    }
}

export const reviewDelete=async(id,review_id)=>{
    try{
 const response=await axiosInstance.delete(`listing/${id}/reviews/${review_id}`);
 return response;
    }catch(error){
        console.log('error in delete reviews');
    }
}

export const newListing=async(data)=>{
    try{
    const response=await axiosInstance.post(`/listing/new`, data);
    return response.data;
    }catch(error){
        console.log(error);
     if(error.response){
        alert(error.response.data.msg)
     }else{
        throw new Error("somthing went wrong");
     }
    }
}

export const editData=async(id,data)=>{
    try{
 const response=await axiosInstance.put(`listing/editDetail/${id}`, data);
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
    const response=await axiosInstance.delete(`listing/deleteCard/${id}`);    
    return response;
}catch(err){
    toast.error(err.response.data.message);
}
}

// singup login 

export const singupdata=async(data)=>{
    
    const response= await axiosInstance.post(`user/singup`,data);
    return response;
}
export const logindata=async(data)=>{
    const response= await axiosInstance.post(`user/login`,data);
    return response;
}



//booking pyment orders api
export const createOrder=async(listing_id)=>{
    console.log('reqest sent');
    const response=await axiosInstance.post(`payment/order`, {listing_id});
    console.log(response);
    return response;
}

export const backendVarify=async(data, listing_id)=>{
    console.log('request sent');
    const response=await axiosInstance.post(`payment/varification`,{...data,listing_id});
    return response;
}