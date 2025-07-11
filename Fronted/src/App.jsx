import React from 'react'

import {Route, Routes} from 'react-router-dom'

import Home from './Pages/Home.jsx';

import Login from './Pages/Login.jsx';

import SignUp from  './Pages/SignUp.jsx';

import ListingPage1 from './Pages/ListingPage1.jsx';

import ListingPage2 from './Pages/ListingPage2.jsx';

import ListingPage3 from './Pages/ListingPage3.jsx';

import MyListing from './Pages/MyListing.jsx';

import ViewCard from './Pages/ViewCard.jsx';

import MyBooking from './Pages/MyBooking.jsx';

import Booked from './Pages/Booked.jsx';

import {UserDataContext} from './Context/UserContext.jsx';
import {useContext} from 'react';

import {Navigate, useNavigate} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

function App() {

  let {userData} = useContext(UserDataContext);
  return(
    <>
    <ToastContainer />
    <Routes>
      <Route path = '/' element= {<Home/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/signUp' element = {<SignUp/>}/>
      <Route path = '/listingPage1' 
      element = {userData != null ? <ListingPage1/>: <Navigate to ={"/"}/>}/>
      <Route path = '/listingPage2' 
      element = {userData != null ? <ListingPage2/> : <Navigate to = {"/"}/>}/>
      <Route path = '/listingPage3' 
      element = {userData != null ? <ListingPage3/> : <Navigate to = {"/"}/>}/>
      <Route path = '/myListing'
      element = {userData != null ?   <MyListing/>  : <Navigate to = {"/"}/>}/>
      <Route path = '/viewCard'
      element ={userData != null  ?   <ViewCard/>   : <Navigate to ={"/"}/>}/>
      <Route path ='/myBooking'
      element ={userData != null  ?  <MyBooking/>   : <Navigate  to ={"/"}/>}/>
      <Route path ='/booked'
       element ={userData != null ?    <Booked/>    : <Navigate   to ={"/"}/>}/>
    </Routes>
    
    </>
  )

}

export default App