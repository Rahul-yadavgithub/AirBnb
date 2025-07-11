import React from 'react';

import { FaLongArrowAltLeft } from "react-icons/fa";

import {useNavigate} from 'react-router-dom';
import {listingDataContext} from '../Context/ListingContext';
import {UserDataContext} from '../Context/UserContext';


import { RxCross2 } from "react-icons/rx";

import axios from 'axios';
import {useContext, useState, useEffect} from 'react';
import {AuthDataContext} from '../Context/AuthContext';
import {bookingDataContext} from '../Context/BookingContext';

import { MdOutlineStarBorder } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";

import {toast} from 'react-toastify';



function ViewCard(){

    let navigate = useNavigate();

    let {cardDetails} = useContext(listingDataContext);
    let {userData} = useContext(UserDataContext);

    let [updatePopUp, setUpdatePopUp] = useState(false);

    let [bookingPopUp, setBookingPopUp] = useState(false);

    let [title, setTitle] = useState(cardDetails.title);
    let [description, setDescription] = useState(cardDetails.description);
    let [frontendImage1, setFrontendImage1] = useState(null);
    let [frontendImage2, setFrontendImage2]  = useState(null);
    let [frontendImage3, setFrontendImage3] = useState(null);
    
    let [backendImage1, setBackendImage1] = useState(null);
    let [backendImage2, setBackendImage2] = useState(null);
    let [backendImage3, setBackendImage3] = useState(null);
    
    let [rent, setRent] = useState(cardDetails.rent);
    let [city , setCity] = useState(cardDetails.city);
    let [category, setCategory] = useState(cardDetails.category);
    let [landmark, setLandmark] = useState(cardDetails.landmark);

     let {serverUrl} = useContext(AuthDataContext);
     let {updating, setUpdate, getListing} = useContext(listingDataContext);
     let {deleting, setDeleting} = useContext(listingDataContext);

     // Setting the Checking Condition 
     let[minDate, setMinDate] = useState("");

     // for Booking 

     let {
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight,
        handleBooking,
        booking }   = useContext(bookingDataContext);

        useEffect(()=>{
          if(checkIn && checkOut){
            let inDate = new Date(checkIn);
            let OutDate = new Date(checkOut);

            let n = (OutDate-inDate)/(24*60*60*1000)

            setNight(n);

            let airBnbCharge = (cardDetails.rent*(7/100));
            let tax = (cardDetails.rent*(10/100));

            if(n>0){
              setTotal((cardDetails.rent*n) + airBnbCharge + tax);
            }
            else{
              setTotal(0);
            }
          }
        },[checkIn, checkOut, cardDetails.rent]);

    const handleUpdateListing = async() =>{
      setUpdate(true);
      try{
            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
           if(backendImage1) {formData.append("image1", backendImage1)};
           if(backendImage2) {formData.append("image2", backendImage2)};
           if(backendImage3) {formData.append("image3", backendImage3)};

            formData.append("rent", rent);
            formData.append("city", city);
            formData.append("landmark", landmark);
            formData.append("category", category);


            console.log("server Url",serverUrl);

            let result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, {
               headers: {
                 "Content-Type": "multipart/form-data"
                },
               withCredentials: true
            });

            setUpdate(false);
            console.log(result.data);
            await getListing();
            setUpdatePopUp(false); 
            navigate("/");

            toast.success("Listing Updated Successfully");

            setTitle("");
            setDescription("");
            setFrontendImage1(null);
            setFrontendImage2(null);
            setFrontendImage3(null);
            setBackendImage1(null);
            setBackendImage2(null);
            setBackendImage3(null);

            setRent("");
            setCity("");
            setLandmark("");

        }
      catch(error){
        setUpdate(false);
        console.log(error);
        toast.error(error.response.data.message);
        
      }
    }

    const handleDelete = async()=>{
      setDeleting(true);
      try{
        let result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, {
           headers: {
             "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        });
        setDeleting(false);

        console.log(result.data);
        await getListing();
        setUpdatePopUp(false);
        navigate("/");
        
        toast.success("Listing is Deleted Successfully");
      }
      catch(error){
        setDeleting(false);
        console.log(error);
        toast.error(error.response.data.message);

      }
    }

    const handleImage = (num , e) =>{
      let file = e.target.files[0];
      if(!file) return;

      if(num == 1) {
        setBackendImage1(file);
      }
      else if(num ==2){
        setBackendImage2(file);
      }
      else if(num == 3){
        setBackendImage3(file);
      }
    }

    // Making Use Effect for cacluating the today's date

    useEffect(()=>{
       let today = new Date().toISOString().split('T')[0];
      setMinDate(today);

    },[])


    return(
        <div className= 'w-[100%] h-[100vh] bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto relative'>
            <div className = 'w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[4%] left-[20px] rounded-[50px] flex items-center justify-center'
                onClick = {()=>navigate("/")}>
                <FaLongArrowAltLeft className ='w-[25px] h-[25px] text-[white]'/>
            </div>
        
            <div className ='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
                <h1 className = 'text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden'>
                    {`In ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
                </h1> 
            </div>
        
            <div className = 'w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
                <div className ='w-[100%] h-[30%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]'>
                    <img src= {cardDetails.image1} alt ="" className ='w-[100%]'/>
                </div>
        
                <div className ='w-[100%] h-[50%] md:w-[50%] md:h-[100%] flex items-center justify-center md:flex-col'>
                   <div className ='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]'>
                       <img src ={cardDetails.image2} alt ="" className ='w-[100%]'/>
                    </div>
                    <div className ='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]'>
                        <img src ={cardDetails.image3} alt ="" className ='w-[100%]'/>
                    </div>
                </div>
            </div>
        
            <div className ='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()} ${cardDetails.landmark.toUpperCase()}`}</div>
            <div className ='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`${cardDetails.description.toUpperCase()}`}</div>
            <div className ='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`Rs ${cardDetails.rent}/day`}</div>
                    
           <div className="w-[95%] h-[60px] flex items-center justify-start px-[135px]">
               {cardDetails.host == userData._id && <button className="px-[30px] py-[10px] bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-200 text-nowrap"
                   onClick = {()=> setUpdatePopUp(prev => !prev)} >
                   Edit Listing
                </button>}

                {cardDetails.host != userData._id && <button className="px-[30px] py-[10px] bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-200 text-nowrap"
                   onClick ={() => setBookingPopUp(prev => !prev)}>
                    Reserev
                </button>}
            </div>


            {/* Update my Listing Page  */}
            {updatePopUp && (<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
                   {/* Close Button */}
                   <RxCross2 className="absolute top-4 right-4 w-8 h-8 text-white bg-red-600 rounded-full p-1 cursor-pointer hover:bg-red-700 transition"
                       onClick={() => setUpdatePopUp(false)}
                    />

                     {/* Form Title */}
                    <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">
                        Update Your Listing
                    </h2>

                     {/* Form */}
                    <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); handleUpdateListing()}}>
                            {/* Title */}
                            <div>
                                <label htmlFor ='title' className ='block text-lg font-medium mb-1'>
                                    Title
                                </label>

                                <input type='text' id='title' className ='w-full border rounded-lg px-4 py-2 text-base border-gray-400'
                                  required placeholder = 'Give the Best Title'   onChange ={(e) =>setTitle(e.target.value)} value = {title}/>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor ='Des' className ='block text-lg front-medium mb-1'>
                                    Description
                                </label>
                                <textarea id= 'des' rows = '4' className = 'w-full border rounded-lg px-4 py-2 text-base border-gray-400 resize-none'
                                   required onChange = {(e) => setDescription(e.target.value)} value = {description}></textarea>
                            </div>

                            {/* Image */}
                            {[1,2,3].map((num) => (
                                <div key= {num}>
                                    <label htmlFor ={`img${num}`} className ='block text-lg font-medium mb-1'>
                                        Image{num}
                                    </label>
                                    <input type ='file' id={`img${num}`} className ='w-full border rounded-lg px-4 py-2 text-base border-gray-400 file:cursor-pointer'
                                      onChange ={(e) =>handleImage(num, e)}/>

                                </div>
                            ))}

                            {/* Rent */}
                            <div>
                              <label htmlFor = 'rent' className ='block text-lg font-medium mb-1'>
                                Rent
                              </label>
                              <input type ='number' id ='rent' className = 'w-full border rounded-lg px-4 py-2 text-base border-gray-400'
                                required onChange = {(e) => setRent(e.target.value)} value = {rent} placeholder ='Rupees/Day'/>
                            </div>

                            {/* City */}

                            <div>
                              <label htmlFor = 'city' className = 'block text-lg font-medium mb-1'>City</label>
                              <input type ='text' id='city' className ='w-full border rounded-lg px-4 py-2 text-base border-gray-400'
                               required onChange = {(e) => setCity(e.target.value)} value = {city} placeholder ='City && Country Name'/>
                            </div>

                            {/* LandMark */}

                            <div>
                               <label htmlFor="landmark" className="block text-lg font-medium mb-1">Landmark</label>
                               <input type='text' id='landmark'  className="w-full border rounded-lg px-4 py-2 text-base border-gray-400"
                                 required onChange = {(e)=> setLandmark(e.target.value)} value = {landmark}/>
                              
                            </div>

                            <div className="w-[100%] flex items-center justify-center gap-4 mt-6">
                              <button type="submit" className="w-1/2 bg-green-600 hover:bg-green-700 text-white text-[15px] md:text-[18px] font-semibold rounded-lg py-[10px] px-[10px] transition text-nowrap"
                                disabled={updating} >
                                  {updating ? "Updating..." : "Update Listing"}
                              </button>

                              <button type ='button' className = 'w-1/2 bg-red-600 hover:bg-red-700 text-white text-[15px] md:text-[18px] font-semibold rounded-lg py-[10px] px-[10px] transition text-nowrap'
                                disabled = {deleting} onClick = {handleDelete}>
                                  {deleting ? "Deleting...": "Delete Listing"}
                              </button>
                            </div>

                       </form>
                    </div>
                </div>
              )} 

              {bookingPopUp && <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 overflow-auto">
                <div className="relative w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 overflow-y-auto">
                  {/* Close Button */}
                  <RxCross2 className="absolute top-4 right-4 w-8 h-8 text-white bg-red-600 rounded-full p-1 cursor-pointer hover:bg-red-700 transition"
                    onClick={() => setBookingPopUp(false)}
                  />

                  {/* LEFT: Booking Form */}
                  <div className="w-full md:w-1/2 h-auto md:h-full bg-[#f3f1f1] p-6 rounded-lg border border-[#dedddd] flex flex-col justify-start">
                      <h1 className="text-center text-[28px] font-semibold text-green-600 border-b border-gray-400 pb-3 mb-4">
                        Confirm & Book
                      </h1>

                      <form className="flex flex-col gap-4 flex-1 justify-center" onSubmit ={(e) => {e.preventDefault()}}>
                        <div className="flex flex-col gap-2">
                          <label className="text-[18px] font-medium">Check In</label>
                          <input type='date' min ={minDate} id ='checkIn'className='border rounded px-4 py-2 text-base border-gray-400 bg-transparent'
                            required onChange ={(e) =>setCheckIn(e.target.value)} value ={checkIn}/>
                        </div>
                        <div className ='flex flex-col gap-2'>
                          <label className ='text-[18px] font-medium'>Check Out</label> 
                          <input type ='date' min={minDate} id='checkOut' className ='border rounded px-4 py-2 text-base border-gray-400 bg-transparent'
                            required onChange = {(e) =>setCheckOut(e.target.value)} value = {checkOut}/>
                        </div>

                        <div className ='flex items-center justify-center mt-4'>
                          <button type='submit' className ='bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-2'
                            onClick ={()=>handleBooking(cardDetails._id)} disabled ={booking}>
                              {booking ? "Booking...": "Book Now"}
                          </button>
                        </div>
                      </form>
                  </div>

                  <div className='w-full md:w-1/2 h-auto md:h-full flex flex-col gap-4 px-[10px]'>
                    <div className='flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-xl w-full transition hover:shadow-2xl'>
                      <img src={cardDetails.image1} alt='Listing Preview' className='w-full sm:w-2/5 h-48 sm:h-auto object-cover rounded-lg shadow-md'/>
                      <div className='flex flex-col justify-between w-2/5'>
                        <h2 className='text-[18px] sm:text-[22px] font-semibold text-gray-800 break-words'> {cardDetails.title.toUpperCase()}</h2>
                        <p className='text-[14px] sm:text-[16px] text-gray-600 italic tracking-wide break-words'> {cardDetails.description.toUpperCase()}</p>
                        <p className='text-[14px] text-gray-500 font-medium'>
                           Category: <span className="text-[#4b5563] font-semibold capitalize">{cardDetails.category}</span>
                        </p>

                        <div className='flex flex-col gap-2 sm:w-3/5'>
                          <MdOutlineStarBorder className='text-yellow-500 w-5 h-5' />
                          <span className='text-[15px] text-gray-700 font-medium'>
                            {cardDetails.rating ?? '0.0'} / 5
                          </span>
                        </div>

                      </div>
                    </div>

                    <div className='w-full border border-[#c7bdbd] rounded-xl shadow-xl p-[20px] gap-[20px] flex flex-col'>
                      <h1 className ='text-[22px] font-semibold'>Booking Price - </h1>
                      <p className='w-full flex justify-between items-center text-sm sm:text-base'>
                        <span  className='flex items-center gap-[2px] text-[16px] text-gray-800 font-semibold'>
                         <FaIndianRupeeSign className='w-4 h-4'/> 
                         {`${cardDetails.rent}   X   ${night}  Nights`}

                        </span>
                        <span className='flex items-center gap-[2px] text-[16px] text-gray-800 font-semibold'>
                          <FaIndianRupeeSign className='w-4 h-4'/> 
                          {(cardDetails.rent*night).toFixed(2)}
                        </span>

                      </p>

                      <p className='w-full flex justify-between items-center text-sm sm:text-base'>
                        <span  className='flex items-center gap-[2px] text-[16px] text-gray-800 font-semibold'>
                          AirBnb Charge 
                        </span>
                        <span className='flex items-center gap-[2px] text-[16px] text-gray-800 font-semibold'>
                          <FaIndianRupeeSign className='w-4 h-4'/> 
                          {(cardDetails.rent*(7/100)).toFixed(2)}
                        </span>
                      </p>

                      <p className='w-full flex justify-between items-center text-sm sm:text-base'>
                        <span  className='flex items-center gap-[2px] text-[16px] text-gray-800 font-semibold'>
                          Tax 
                        </span >
                        <span className='flex items-center gap-[2px] text-[16px] text-gray-800 font-semibold'>
                          <FaIndianRupeeSign className='w-4 h-4'/> 
                          {(cardDetails.rent*(10/100)).toFixed(2)}
                        </span>
                      </p>

                      <p className='w-full flex justify-between items-center text-sm sm:text-base '>
                        <span  className='flex items-center gap-[2px] text-[25px] text-green-500 font-semibold'>
                          Total Price
                        </span>
                        <span className='flex items-center gap-[2px] text-[16px] text-gray-800 font-semibold'>
                          <FaIndianRupeeSign className='w-4 h-4'/> 
                          {(total).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>}
     </div>
    )
}

export default ViewCard;