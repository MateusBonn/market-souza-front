import React, {createContext, useState} from "react";
import { useNavigate } from "react-router-dom"
import {api, createSession} from "../components/services/api"
import Cookies from "universal-cookie";
import { setCookies } from "../components/UniversalFunctions/UniversalFunctions";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading ] = useState(true)


    const login = async (username, password) => {
        try {
            
            const response = await createSession(username, password);
            await setCookies(response)
            setUser(response.data.login)
            navigate("/home")
        }catch(error){
            alert(error);
            window.location.reload();
        }
       
    }
 
    const logout = () => {
        var cookie = new Cookies();
        cookie.remove('user')
        cookie.remove('role')
        cookie.remove('token')
        cookie.remove('refreshToken')

        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/")
    };

    return (
        <AuthContext.Provider 
        value={{authenticated: !!user, user, loading, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}