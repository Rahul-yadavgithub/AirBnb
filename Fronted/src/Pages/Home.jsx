import React from 'react'

import Nav from '../Component/Nav';

import {useContext} from 'react';

import {listingDataContext} from '../Context/ListingContext';

import Card from '../Component/Card';

function Home(){
    let{listingData, setListingData,newListData} = useContext(listingDataContext);
    return(
        <div>
            <Nav/>
            <div className = 'w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]'>
                {newListData.map((list) =>(        // Hear if we use =>{} curly braces then we need to write return <Card/> and when we write =>() then we don't need to write anything
                    <Card  
                    key={list._id}
                    title ={list.title} 
                    landmark={list.landmark} 
                    city={list.city} 
                    image1={list.image1} image2={list.image2} image3={list.image3} 
                    rent={list.rent} 
                    id={list._id}
                    rating = {list.rating}
                    isBooked ={list.isBooked}
                    host = {list.host}
                    guest ={list.guest}/>
                ))}

            </div>
        </div>
    )

}

export default Home;