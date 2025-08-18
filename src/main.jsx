import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './componets/Home.jsx'
import { requestData } from '../services/api.jsx'
import HomeCardDetail from './componets/HomeCardDetail.jsx'
import AddForm from './componets/AddForm.jsx'
import {submitEditFom, submitFormAction, submitLogInForm, submitSingUpForm } from './componets/submitFormAction.jsx'
import EditDEtail from './componets/EditDEtail.jsx'
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";
import { MyProvider } from './contexts/MyProvider.jsx'
import SingUp from './componets/SingUp.jsx'
import LogIn from './componets/LogIn.jsx'
import Dashboard from './componets/Dashboard.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>,
        loader:requestData
      },
      {
        path:"/listingDetail/:listing_id",
        element:<HomeCardDetail/>,
      },
      {
        path:"/addForm",
        element:<AddForm/>,
        action: submitFormAction
      },
      {
        path:"/editDetail/:listing_id",
        element:<EditDEtail/>,
        action:submitEditFom
      },
      {
        path:"/singup",
        element:<SingUp/>,
        action:submitSingUpForm
      },
      {
        path:"/login",
        element:<LogIn/>,
        action:submitLogInForm
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <MyProvider>
    <RouterProvider router={router}> 
    </RouterProvider>
    </MyProvider>
  </StrictMode>,
)
