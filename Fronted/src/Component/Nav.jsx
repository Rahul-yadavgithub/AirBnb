import React from 'react'

import Logo from '../assets/Logo.svg';

import {useState} from 'react';

import { IoSearch } from "react-icons/io5";

import { GiHamburgerMenu } from "react-icons/gi";

import { CgProfile } from "react-icons/cg";

import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";

import {useNavigate} from 'react-router-dom';

import {AuthDataContext} from '../Context/AuthContext';
import {useContext, useEffect} from 'react';
import axios from 'axios';

import {UserDataContext} from '../Context/UserContext';
import {listingDataContext} from '../Context/ListingContext';

import {toast} from 'react-toastify';

function Nav(){
    let [showpopup, setShowPopup] = useState(false);

    let navigate = useNavigate();

    let {userData, setUserData} = useContext(UserDataContext);

    let {serverUrl} = useContext(AuthDataContext);
    let [category, setCategory] = useState();
    let {listingData, setListingData,newListData, setNewListData,searchData, handleSearch, handleViewCard} = useContext(listingDataContext);

    let [input, setInput] = useState("");

    const handleLogout = async() =>{
        try{
            let result = await axios.post(serverUrl+ "/api/auth/logout", {withCredentials: true});

            setUserData(null);
            
            console.log(result);

            toast.success("Logout Successfully");

        }
        catch(error){
            console.log(error);
            toast.error("Logout Error");
        }
    }

    const handleCategory = (cate)=>{
        setCategory(cate);
        if(cate == "Trending"){
            setNewListData(listingData);
        }
        else{
        setNewListData(listingData.filter((list) => list.category == cate));
        }


    }

    const handleClick = (id)=>{
        if(userData){
            handleViewCard(id);
        }
        else{
            navigate("/login")
        }
    }

    useEffect(()=>{
        handleSearch(input)
    },[input]);
    
    return(
        <div className = 'fixed top-0 bg-white z-[20]'>
             <div className ='w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[20px] flex items-center justify-between md:px-[40px]'>
                <div>
                    <img src ={Logo} alt ="" className ='w-[130px] py-[15px]'/>
                </div>

                <div className ='w-[35%] relative hidden md:block'>
                    <input type ="text" className = 'w-[65%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-xl text-[17px]'
                     placeholder="Any Where | Any Location | Any City" onChange ={(e) =>setInput(e.target.value)} value = {input}/>
                    <button className ='absolute p-[10px] rounded-[50px] bg-[#55c2da] left-[57%] top-[4px]'><IoSearch className ='w-[22px] h-[22px] '/></button>

                    { searchData?.length > 0 && <div className="absolute w-[65%] bg-white border-[1px] border-gray-300 rounded-xl shadow-lg mt-[10px] z-50 left-0 max-h-[300px] overflow-auto">
                       <ul className="text-left text-[15px]">
                           {searchData.map((search) => (
                             <li className="px-4 py-2 hover:bg-[#f3f4f6] cursor-pointer" onClick ={()=>handleClick(search._id)}>
                                {search.title} in {search.landmark}, {search.city}
                            </li>
                            ))}
                       </ul>
                     </div>}
                </div>

                <div className ='flex items-center justify-center gap-[10px] relative'>
                    <span className ='text-[18px] cursor-pointer rounded-[40px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block' onClick = {()=> navigate("/listingPage1")}>List Your Home</span>
                    <button className ='px-[20px] py-[10px] flex items-center justify-center gap-[7px] border-[1px] border-[#8c8d8d] rounded-[50px] hover:shadow-lg'
                      onClick = {() => setShowPopup(prev => !prev)}>
                        <span>
                            <GiHamburgerMenu className='w-[20px] h-[20px]'/>
                        </span>
                        {userData == null && <span>
                            <CgProfile className = 'w-[23px] h-[23px]'/>
                        </span>}

                        {userData &&
                            <span className='w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center'>
                                    {userData?.name?.slice(0, 1).toUpperCase()}
                            </span>
                        }

                    </button>

                    {showpopup && <div className ='w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[3%] border-[1px] border-[#aaa9a9] z-10 rounded-lg md:right-[10%]'>
                        <ul className ='w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[10px]'>
                            {!userData &&<li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick ={()=> {navigate("/login");
                                setShowPopup(false)}}>Login</li>}
                            {userData && <li className ='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer'onClick ={() => {handleLogout();
                                setShowPopup(false)}}>Logout</li>}
                                
                              {/* Refined divider */}
                            <li className="w-full py-[3px]">
                               <div className="w-full h-[1px] bg-gray-400"></div>
                            </li>

                            <li className ='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick = {()=> {navigate("/listingPage1");
                                setShowPopup(false)}}>List Your Home</li>

                            <li className ='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick = {()=> {navigate("/myListing");
                                setShowPopup(false)}}>My Listing</li>

                            <li className ='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick ={()=>{navigate("/myBooking");
                                setShowPopup(false)
                            }}>My Booking</li>
                        </ul>

                    </div>
                    }
                </div>

            </div>

             {/* This is for the making the font of serach good when we change the brawser size  */}

             <div className ='w-[100%] h-[60px] flex items-center justify-center md:hidden'>
                <div className ='w-[35%] relative'>
                    <input type ="text" className = 'w-[65%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-xl text-[17px]'
                     placeholder="Any Where | Any Location | Any City" onChange ={(e) =>setInput(e.target.value)} value = {input}/>
                    <button className ='absolute p-[10px] rounded-[50px] bg-[#55c2da] left-[57%] top-[4px]'><IoSearch className ='w-[22px] h-[22px] '/></button>
                </div>
             </div>
             

            <div className = 'w-[100vw] h-[85px] bg-[white] flex items-center justify-start gap-[80px] overflow-auto md:justify-center px-[15px]'>
                <div className = 'flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px]' 
                   onClick = {() => {handleCategory("Trending");
                    setCategory("")}
                   }
                >
                    <MdWhatshot className ='w-[30px] h-[30px] text-black' />
                    <h3>Trending</h3>
                </div>

                <div className = {`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                    ${category == "villa"?"border-b-[1px] border-[#a6a5a5]":""}`}  onClick ={()=>handleCategory("villa")}>
                    <GiFamilyHouse className ='w-[30px] h-[30px] text-black'/>
                    <h3>Villa</h3>
                </div>

                <div className = {`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                    ${category == "farmHouse"?"border-b-[1px] border-[#a6a5a5]":""}`}  onClick ={()=> handleCategory("farmHouse")}>
                    <MdBedroomParent className ='w-[30px] h-[30px] text-black'/>
                    <h3>Farm House</h3>
                </div>

                <div className = {`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                    ${category == "pool"?"border-b-[1px] border-[#a6a5a5]":""}`}  onClick ={()=> handleCategory("pool")}>
                    <MdOutlinePool className ='w-[30px] h-[30px] text-black'/>
                    <h3>Pool House</h3>
                </div>

                <div className = {`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                    ${category == "rooms"?"border-b-[1px] border-[#a6a5a5]":""}`}  onClick ={()=> handleCategory("rooms")}>
                    <GiWoodCabin className ='w-[30px] h-[30px] text-black'/>
                    <h3>Rooms</h3>

                </div>

                <div className = {`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                    ${category == "flat"?"border-b-[1px] border-[#a6a5a5]":""}`}  onClick ={()=> handleCategory("flat")}>
                    <SiHomeassistantcommunitystore className ='w-[30px] h-[30px] text-black'/>
                    <h3>Flat</h3>
                </div>

                <div className = {`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                    ${category == "pg"?"border-b-[1px] border-[#a6a5a5]":""}`}  onClick ={()=> handleCategory("pg")}>
                    <IoBedOutline className ='w-[30px] h-[30px] text-black'/>
                    <h3>PG</h3>
                </div>

                <div className = {`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                    ${category == "cabin"?"border-b-[1px] border-[#a6a5a5]":""}`}  onClick ={()=> handleCategory("cabin")}>
                    <FaTreeCity className ='w-[30px] h-[30px] text-black'/>
                    <h3>Cabins</h3>
                </div>

                <div className = {`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                    ${category == "shops"?"border-b-[1px] border-[#a6a5a5]":""}`}  onClick ={()=> handleCategory("shops")}>
                    <BiBuildingHouse className ='w-[30px] h-[30px] text-black'/>
                    <h3>Shops</h3>
                </div>

            </div>
        </div>
    )
}

export default Nav;
