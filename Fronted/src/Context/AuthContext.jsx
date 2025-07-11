import { createContext , useState} from "react";

export const AuthDataContext = createContext();

export function AuthProvider({ children }) {
    const serverUrl = "http://localhost:8000";

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
