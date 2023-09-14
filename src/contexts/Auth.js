import React, {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"
import {api, createSession} from "../components/services/api"
import Cookies from "universal-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading ] = useState(true)


    useEffect(() => {
        const recoveredUser = localStorage.getItem("role");
        
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }

        setLoading (false)
    }, [])

    const login = async (username, password) => {
        try {
            
            const response = await createSession(username, password);
            console.log("Login auth", response.data);

            const loggedUser = response.data.login;
            const token = response.data.token;
            console.log("Logged user login:", loggedUser);

            var cookie = new Cookies();
            
            cookie.set('user', loggedUser.firstName)
            cookie.set('role', loggedUser.role)
            cookie.set('token', token.accessToken)
            cookie.set('refreshToken', token.refreshToken)

            console.log('Entrada', cookie.get('token'))

            api.defaults.headers.Authorization = `Bearer ${token.accessToken}`

            setUser(loggedUser)
            navigate("/home")
        }catch(error){
            alert("error.response.data.message", error);
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