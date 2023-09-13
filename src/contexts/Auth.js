import React, {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"
import {api, createSession} from "../components/services/api"

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

            localStorage.setItem('login', JSON.stringify(loggedUser))
            localStorage.setItem('token', JSON.stringify(token))

            console.log('Entrada', JSON.parse(localStorage.getItem('token')).accessToken)


            api.defaults.headers.Authorization = `Bearer ${token.accessToken}`

            setUser(loggedUser)
            navigate("/home")
        }catch(error){
            alert(error.response.data.message);
            window.location.reload();
        }
       
    }
 
    const logout = () => {
        localStorage.removeItem('login')
        localStorage.removeItem('token')
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