import React from 'react'
import { editData, logindata, newListing, singupdata } from '../../services/api';


 export async function submitFormAction({request}) {
  const res=await request.formData();
  const data=Object.fromEntries(res);
   const result=await newListing(data);
  
  return { success: true, data: result }; 
}

export async function submitEditFom({request, params}){
  const { listing_id } = params;
  const res=await request.formData();
  const data=Object.fromEntries(res);
  const result= await editData(listing_id,data);

  return {success:true, data: result};
}

export async function submitSingUpForm({request}){
 const res=await request.formData();
 const data=Object.fromEntries(res);
 console.log(data);
 const result= await singupdata(data);
 return {success:true, data:result};
}

export async function submitLogInForm({request}) {
  const res=await request.formData();
  const data=Object.fromEntries(res);
  const result=await logindata(data);
  console.log(result);
  return {success:true, data:result};

}
