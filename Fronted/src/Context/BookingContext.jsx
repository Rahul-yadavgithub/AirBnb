import React from 'react';

import {createContext, useState, useContext} from 'react';

import {AuthDataContext} from '../Context/AuthContext';

import {UserDataContext} from '../Context/UserContext';

import {listingDataContext} from '../Context/ListingContext';

import axios from 'axios';

import {useNavigate} from 'react-router-dom';

import {toast} from 'react-toastify';


export const bookingDataContext = createContext();

function BookingContext({children}){

     let navigate = useNavigate();

    let [checkIn, setCheckIn] = useState("");
    let [checkOut, setCheckOut] = useState("");
    let [total, setTotal] = useState(0);
    let [night, setNight] = useState(0);

    let {serverUrl} = useContext(AuthDataContext)

    let {getCurrentUser} = useContext(UserDataContext);
    let {getListing} = useContext(listingDataContext);
    let [bookingData, setBookingData] = useState([]);
    let [booking , setBooking] = useState(false);

    const handleBooking = async(id)=>{
        setBooking(true);
        if(!checkIn || !checkOut || total <= 0){
            alert("Please enter valid dates and ensure price is calculated.");
            return;
        }
        try{
            let result = await axios.post( serverUrl + `/api/booking/create/${id}` ,{
                checkIn, checkOut, totalRent:total
            }, {withCredentials :true})

            await getCurrentUser();
            await getListing();
            setBookingData(result.data);
            console.log(result.data);

            setBooking(false);
            navigate("/booked");
            toast.success("Booking Confirm");
        }
        catch(error){
            console.log(error);
            if (error.response?.data?.message) {
               alert("Booking failed: " + error.response.data.message);
            }
            setBookingData(null);
            setBooking(false);

        }
    }

    const cancelBooking = async(id) =>{
        try{
            let result = await axios.delete(serverUrl + `/api/booking/cancel/${id}`,{
                withCredentials: true
            })
            await getCurrentUser();
            await getListing();
            console.log(result.data);
            toast.success("Booking Cancelled");
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message);

        }
    }

    let value ={
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight,
        bookingData, setBookingData,
        handleBooking,
        cancelBooking,
        booking , setBooking
    }
    return(
        <div>
            <bookingDataContext.Provider value ={value}>
                {children}
            </bookingDataContext.Provider>

        </div>
    )
}

export default BookingContext;