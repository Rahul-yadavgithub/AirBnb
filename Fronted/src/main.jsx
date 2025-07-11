import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'

import UserContext from './Context/UserContext';
import ListingContext from './Context/ListingContext';
import BookingContext from './Context/BookingContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> 
        <ListingContext>
        <UserContext>
          <BookingContext>
            <App/>
          </BookingContext>
        </UserContext>
        </ListingContext>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
