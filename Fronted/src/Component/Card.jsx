import react from 'react';

import {useContext, useState} from 'react';

import {UserDataContext} from '../Context/UserContext';
import {listingDataContext} from '../Context/ListingContext';
import {bookingDataContext} from '../Context/BookingContext';

import {useNavigate} from 'react-router-dom';


import { MdOutlineStarBorder } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";

function Card({title, landmark, image1, image2, image3, rent, city, id,rating,isBooked,host,guest}){

    let {navigate} = useNavigate();

    let {userData} = useContext(UserDataContext);
    let {handleViewCard} = useContext(listingDataContext);

    let [popUp , setPopUp] = useState(false);

    let {cancelBooking} = useContext(bookingDataContext);


    const handleClick = ()=>{
        if(userData){
            handleViewCard(id);
        }
        else{
            navigate("/login")
        }
    }
    return(
        <div className ='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer relative' 
        onClick ={ ()=> !isBooked ? handleClick(): null}>

           {isBooked && <div className ='text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px]'>
                <GiConfirmed className ='w-[20px] h-[20px] text-green-500'/>Booked</div>}

            {isBooked && guest == userData?._id && <div className ='text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px]' 
                onClick ={() =>setPopUp(prev => !prev)}>
                <FcCancel className ='w-[20px] h-[20px] text-green-500' />
                Cancel Booking 
            </div>}

            { popUp && <div className="absolute top-[110px] left-[13px] w-[300px] bg-white rounded-xl shadow-lg border border-gray-300 animate-fadeIn z-50">
                <div className="px-4 py-3 border-b border-gray-200 text-gray-800 text-lg font-semibold text-center">
                    Cancel Booking
                </div>

                <div className="p-4 flex flex-col items-center gap-4">
                    <p className="text-base text-gray-600 font-medium">Are you sure you want to cancel?</p>
                    <div className="flex gap-4">
                        <button className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200" 
                           onClick = {()=>{cancelBooking(id); setPopUp(false)}}>
                            Yes
                        </button>

                         <button className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                            onClick ={() => setPopUp(false)}>
                            No
                         </button>
                    </div>
                </div>

            </div>}

            <div className ='w-[100%] h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex'>
                <img src= {image1} alt="" className='w-[100%] flex-shrink-0'/>
                <img src ={image2} alt ="" className='w-[100%] flex-shrink-0'/>
                <img src ={image3} alt ="" className='w-[100%] flex-shrink-0'/>
            </div>

            <div className ='w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]'>
                <div className ='flex items-center justify-between text-[18px]'>
                    <span className ='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>
                        {`IN ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
                    </span>

                    <span className ='flex items-center justify-center gap-[]'> 
                        <MdOutlineStarBorder className ='text-[#eb6262]'/>
                        {rating}
                    </span>

                </div>
                <span className ='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'>{title.toUpperCase()}</span>
                <span className ='text-[16px] font-semibold text-[#986b6b]'>{rent}/day</span>

            </div>

        </div>
    )
}

export default Card;