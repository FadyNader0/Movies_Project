import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={5000} 
        theme="dark" 
        pauseOnHover
        toastStyle={{ minWidth: '300px', maxWidth: '600px',}}
      />
    </BrowserRouter>
  </StrictMode>,
)
