import React from 'react';

import {useNavigate} from 'react-router-dom';

import {useContext} from 'react';

import {UserDataContext} from '../Context/UserContext';

import { FaLongArrowAltLeft } from "react-icons/fa";

import Card from '../Component/Card';

function MyBooking(){
    let navigate = useNavigate();
    let {userData} = useContext(UserDataContext);
    return(
        <div className = 'w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative'>
            <div className = 'w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50px] flex items-center justify-center'
                onClick = {()=>navigate("/")}>
                <FaLongArrowAltLeft className ='w-[25px] h-[25px] text-[white]'/>
            </div>

            <div className = {`w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px]
            flex items-center justify-center text-[15px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:w-[600px] text-nowrap md:text-[30px]`}>
                My Booking
            </div>

            <div className ='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wraap mt-[30px]'>
                {userData.booking.map((list) =>(
                    <Card  
                    key={list._id}
                    title ={list.title} 
                    landmark={list.landmark} 
                    city={list.city} 
                    image1={list.image1} image2={list.image2} image3={list.image3} 
                    rent={list.rent} 
                    id={list._id}
                    rating ={list.rating}
                    isBooked ={list.isBooked}
                    host = {list.host}
                    guest = {list.guest}/>
                ))}
            </div>

        </div>
    )
}

export default MyBooking;