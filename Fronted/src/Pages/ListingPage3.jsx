import React from 'react';

import { FaLongArrowAltLeft } from "react-icons/fa";

import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {listingDataContext} from '../Context/ListingContext';

function ListingPage3(){
    let navigate = useNavigate();

    let { 
            title, setTitle,
            description, setDescription,
            frontendImage1, setFrontendImage1,
            frontendImage2, setFrontendImage2,
            frontendImage3, setFrontendImage3,
            backendImage1 , setBackendImage1,
            backendImage2, setBackendImage2,
            backendImage3, setBackendImage3,
            rent, setRent,
            city, setCity,
            landmark, setLandmark,
            category, setCategory,
            handleAddListing,
            adding, setAdding } = useContext(listingDataContext);
    
    return(
        <div className= 'w-[100%] h-[100vh] bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto relative'>
             <div className = 'w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[4%] left-[20px] rounded-[50px] flex items-center justify-center'
                onClick = {()=>navigate("/listingPage2")}>
                <FaLongArrowAltLeft className ='w-[25px] h-[25px] text-[white]'/>
            </div>

            <div className ='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
                <h1 className = 'text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden'>
                    {`In ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
                </h1> 
            </div>

            <div className = 'w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
                <div className ='w-[100%] h-[30%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]'>
                    <img src= {frontendImage1} alt ="" className ='w-[100%]'/>
                </div>

                <div className ='w-[100%] h-[50%] md:w-[50%] md:h-[100%] flex items-center justify-center md:flex-col'>
                    <div className ='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]'>
                        <img src ={frontendImage2} alt ="" className ='w-[100%]'/>
                    </div>
                    <div className ='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]'>
                        <img src ={frontendImage3} alt ="" className ='w-[100%]'/>
                    </div>
                </div>
            </div>

            <div className ='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`${title.toUpperCase()} ${category.toUpperCase()} ${landmark.toUpperCase()}`}</div>
            <div className ='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`${description.toUpperCase()}`}</div>
            <div className ='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`Rs ${rent}/day`}</div>
            
            <div className = 'w-[95%] h-[50px] flex items-center justify-start px-[110px] mt-[15px]'>
                <button className ='px-[30px] py-2 bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-200 text-nowrap' onClick = {handleAddListing} disabled = {adding}>
                    {adding ? "Adding..." : "Add Your Listing"}
                </button>
            </div>
            
        </div>
    )
}

export default ListingPage3;