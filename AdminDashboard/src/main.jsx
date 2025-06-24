import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AdminPannel from "./Admin/Admin";
import AdminNotes from "./Admin/AdminNotes";
import AdminBlog from "./Admin/AdminBlog";
import PageHistory from "./Admin/History";
import AdminQuiz from "./Admin/AdminQuiz";
import AdminLogin from './Admin/AdLogin';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
