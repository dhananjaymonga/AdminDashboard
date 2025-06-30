import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter,createBrowserRouter,RouterProvider } from 'react-router-dom';
import AdminPannel from "./Admin/Admin";
import AdminNotes from "./Admin/AdminNotes";
import AdminBlog from "./Admin/AdminBlog";
import PageHistory from "./Admin/History";
import AdminQuiz from "./Admin/AdminQuiz";
import AdminLogin from './Admin/AdLogin';

import './index.css'
import App from './App.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/admin",
    element:<AdminPannel/>
  },
  {
    path:"/admin/blog", 
    element:<AdminBlog/>
  },
  {
    path:"/admin/notes", 
    element:<AdminNotes/>
  },
  {
    path:"/admin/history", 
    element:<PageHistory/>
  },
  {
    path:"/admin/quiz", 
    element:<AdminQuiz/>
  },
  // {
  //   path:"/phone", 
  //   element:<Phone/>
  // },
  //  {
  //   path:"/item", 
  //   element:<Item/>
  // },
  // {
  //   path:"/Helpcenter", 
  //   element:<Helpcenters/>
  // }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <RouterProvider router={router}/>

 

  
)
