import { createContext, useState } from "react";

export const MyContext =createContext();

export function MyProvider({children}){
  const [formData ,setFormData] = useState({rating:3});
    const[token,setToken]=useState(localStorage.getItem("token")|| "");
    const[userid,setUserid]=useState(localStorage.getItem("userid"|| ""));

  const storeToken=(token)=>{
    return localStorage.setItem("token", token);
  }

    return (
        <MyContext.Provider value={{ formData,setFormData, storeToken, token,setToken, userid,setUserid }}>
          {children}
        </MyContext.Provider>
      );
}