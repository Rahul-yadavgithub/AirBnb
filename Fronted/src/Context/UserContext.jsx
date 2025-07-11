import React, { useState, createContext, useContext, useEffect } from 'react';
import { AuthDataContext } from './AuthContext';  // ✅ Correct context import
import axios from 'axios';

export const UserDataContext = createContext();

function UserContext({ children }) {
    const { serverUrl } = useContext(AuthDataContext);  // ✅ Correct usage

    const [userData, setUserData] = useState(null);

    const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/currentuser", {
                withCredentials: true
            });
            setUserData(result.data);
        } catch (error) {
            setUserData(null);
            console.log(error);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);  // ✅ You should also pass an empty dependency array to prevent re-running on every render

    let value = { 
        userData, setUserData,
        getCurrentUser
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserContext;
