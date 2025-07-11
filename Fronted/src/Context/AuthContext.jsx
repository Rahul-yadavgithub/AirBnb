import { createContext , useState} from "react";

export const AuthDataContext = createContext();

export function AuthProvider({ children }) {
    const serverUrl = "https://airbnb-backend-4jep.onrender.com";

    let [loading , setLoading] = useState(false);

    let value = {
        serverUrl,
        loading, setLoading
    }
    return (
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    );
}
