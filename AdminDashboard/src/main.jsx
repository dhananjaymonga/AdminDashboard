import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AdminPannel from "./Admin/Admin";
import AdminNotes from "./Admin/AdminNotes";
import AdminBlog from "./Admin/AdminBlog";
import PageHistory from "./Admin/History";
import AdminQuiz from "./Admin/AdminQuiz";
import AdminLogin from './Admin/AdLogin';
import { BrowserRouter,createBrowserRouter,RouterProvider } from 'react-router-dom';

import './index.css'
import App from './App.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<AdminLogin/>
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
 
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
