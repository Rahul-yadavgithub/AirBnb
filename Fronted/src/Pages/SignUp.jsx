import React from 'react'
import {useState} from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {useNavigate} from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";

import {useContext} from 'react'
import axios from 'axios';

import {AuthDataContext} from '../Context/AuthContext'
import {UserDataContext} from '../Context/UserContext';

import {toast} from 'react-toastify';

function SignUp(){
    let [show, setShow] = useState(false);
    let navigate = useNavigate();

    let {serverUrl} = useContext(AuthDataContext);

    let {userData, setUserData} = useContext(UserDataContext);

    // For Values like name email and password we use the given below one 

    let [name, setName] = useState("");

    let [email, setEmail] = useState("");

    let [password , setPassword] = useState("");

    let {loading, setLoading} = useContext(AuthDataContext);


    // for feteching data from the backend we need to install the npm i axios

    const handleSignUp = async(e) =>{
        setLoading(true);
        try{
            // for preventing the refereshing the page 
            e.preventDefault();
            let result = await axios.post(serverUrl + "/api/auth/signUp",{
                name,
                email,
                password

            },{withCredentials: true});

            setLoading(false);

            setUserData(result.data);
            navigate("/");
            toast.success("SignUp Successfully");
            console.log(result);

        }
        catch(error){
            setLoading(false);
            console.log(error);
            toast.error(error.response.data.message);

        }
    }
    return(
        <div className = 'w-[100vw] h-[100vh] flex items-center justify-center relative'>

           {/* This is for the Arraw which takes you to the home page */}

            <div className = 'w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' 
                onClick = {() => navigate("/")}>
                <FaLongArrowAltLeft  className ='w-[25px] h-[25px] text-[white]'/>
            </div>

            <form action = "" className ='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col
            md:items-start gap-[10px]' onSubmit ={handleSignUp}>
                <h1 className = 'text-[30px] text-[black]'>Welcome to AirBnb</h1>
                <div className ='w-[40%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor ="name" className ='text-[20px]'>UserName</label>
                    <input type ="text" id = 'name' className ='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]'
                       required onChange={(e) =>setName(e.target.value)}
                       value = {name}/>
                </div>

                <div className ='w-[40%] flex items-start justify-start flex-col gap-[10px]'>
                    <label htmlFor ="email" className ='text-[20px]'>Email</label>
                    <input type = "text" id = 'email' className ='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]'
                      required onChange = {(e)=>setEmail(e.target.value)}
                      value = {email}/>
                </div>
                <div className = 'w-[40%] flex items-start justify-start flex-col gap-[10px] relative'>
                    <label htmlFor = "password" className = 'text-[20px]'> Password</label>
                    <input type = {show ? "text": "password"} id ='password' className = 'w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]'
                       required onChange = {(e) => setPassword(e.target.value)}
                       value = {password}/>
                    {!show && <IoMdEye className ='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick = {() =>{
                        setShow(prev => !prev)
                    }}/>}

                    {show && <IoMdEyeOff className ='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick = {() =>{
                        setShow(prev => !prev)
                    }}/>}
                </div>

                <button className = 'px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-200' disabled = {loading}>
                    {loading ? "Loading..": "SignUp"}
                </button>

                <p>Already have a Account ? 
                    <span className = 'text-[19px] text-[red] cursor-pointer' onClick = {() => navigate("/login")}> Login</span>
                </p>

            </form>
            
        </div>
    )
}

export default SignUp;