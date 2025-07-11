import React from 'react';

import {useState} from 'react';

import { MdOutlineStarBorder } from "react-icons/md";

function Star({starValue = 5 , onRate}){
    
    let [rating, setRating] = useState(0);
    let [hover, setHover]  = useState(0);


    return(
        <div className ='flex gap-1'>
            {
                [...Array(starValue)].map((_,index)=>{
                    const starValue = index+1;

                    const isFilled =starValue <= (hover || rating);

                    return(
                        <span key = {starValue} onClick ={()=>{
                            setRating(starValue)
                            onRate && onRate(starValue)
                        }}
                        onMouseEnter = {()=> setHover(starValue)}

                        onMouseLeave = {()=> setHover(0)} >
                            <MdOutlineStarBorder className ={`cursor-pointer text-2xl ${isFilled ? "text-yellow-400": "text-gray-400"}`}/>
                        </span>
                    )
                })
            }

        </div>
    )
}

export default Star;