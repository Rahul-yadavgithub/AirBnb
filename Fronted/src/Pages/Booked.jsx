import React from 'react';

import { GiConfirmed } from "react-icons/gi";

import{useContext, useState} from 'react';

import {bookingDataContext} from '../Context/BookingContext';

import {useNavigate} from 'react-router-dom';

import Star from '../Component/Star';

import axios from 'axios';

import {AuthDataContext} from '../Context/AuthContext';

import {UserDataContext} from '../Context/UserContext';

import {listingDataContext} from '../Context/ListingContext';

import {toast} from 'react-toastify';

function Booked(){

    let {bookingData} = useContext(bookingDataContext);
    let navigate = useNavigate();

    let [star, setStar] = useState(null);

    let {serverUrl} = useContext(AuthDataContext);
    let {getCurrentUser} =useContext(UserDataContext);
    let {getListing} = useContext(listingDataContext);
    let {cardDetails} = useContext(listingDataContext);


    const handleRating = async(id) =>{
        try{
            let result = await axios.post(serverUrl + `/api/listing/rating/${id}`,{
                rating:star
            },{withCredentials: true});

            await getCurrentUser();
            await getListing();

            console.log(result);
            navigate("/");

            toast.success("Rating Set Successfully");

        }
        catch(error){

            console.log(error);
            toast.error(error.response.data.message);

        }
    }

    const handleStar = async(value) =>{
        setStar(value);
        console.log("You Rated" , value);
    }

    return(
        <div className ='w-[100vw] min-h-[100vh] flex items-center justify-center gap-[10px] bg-slate-200 flex-col'>
            <div className ='w-[95%] max-w-[500px] h-[400px] bg-white flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <div className ='w-[100%] h-[50%] text-[20px] flex items-center justify-center flex-col gap-[20px] font-semibold'>
                    <GiConfirmed className ='w-[100px] h-[100px] text-green-500'/> Booking Conformed
                </div>

                <div className ='w-[100%] flex items-center justify-between tex-[16px] md: text-[18px]'>
                    <span>Booking Id : </span><span>{bookingData._id}</span>
                </div>

                <div className ='w-[100%] flex items-center justify-between tex-[16px] md: text-[18px]'>
                    <span>Owner Details : </span><span>{bookingData.guest?.email}</span>
                </div>

                <div className ='w-[100%] flex items-center justify-between tex-[16px] md: text-[18px]'>
                    <span>Total Rent : </span><span>{bookingData.totalRent}</span>
                </div>

            </div>

            <div className ='w-[95%] max-w-[600px] h-[200px] bg-[white] flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <h1 className='text-[20px]'> {star} out of 5 Rating</h1>
                <Star onRate ={handleStar}/>
                <button className ='px-[30px] py-[10px] bg-red-600 hover:bg-red-700 text-white text-[18px] md:px-[100px] rounded-lg shadow-md transition-all duration-200 text-nowrap'
                  onClick = {()=>handleRating(cardDetails._id)}>
                Submit
                </button>
            </div>

            <button className ='px-[10px] py-[10px] bg-green-600 hover:bg-green-700 text-white text-[18px] md:px-[70px] rounded-lg shadow-md transition-all duration-200 text-nowrap'
             onClick ={()=>navigate("/")}>
                Back To Home
            </button>

        </div>
    )
}

export default Booked;